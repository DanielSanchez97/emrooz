import { useEffect, useState } from "react";
import { Store } from "@tauri-apps/plugin-store";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

type S3Config = {
  endpoint: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
};

type Heartbeat = {
  deviceId: string;
  timestamp: string;
  message: string;
};

const HEARTBEAT_KEY = "spike-sync/heartbeat.json";

function getDeviceId(): string {
  let id = localStorage.getItem("device-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device-id", id);
  }
  return id;
}

function defaultMessage(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad/.test(ua)) return "hello from iOS";
  if (/Android/.test(ua)) return "hello from Android";
  if (/Mac/.test(ua)) return "hello from macOS";
  if (/Windows/.test(ua)) return "hello from Windows";
  if (/Linux/.test(ua)) return "hello from Linux";
  return "hello";
}

export default function App() {
  const [store, setStore] = useState<Store | null>(null);
  const [config, setConfig] = useState<S3Config | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [message, setMessage] = useState(defaultMessage());
  const [pulled, setPulled] = useState<Heartbeat | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  function appendLog(line: string) {
    setLog((prev) =>
      [`[${new Date().toLocaleTimeString()}] ${line}`, ...prev].slice(0, 30),
    );
  }

  useEffect(() => {
    (async () => {
      try {
        const s = await Store.load("spike-sync.json", { autoSave: true });
        setStore(s);
        const saved = (await s.get<S3Config>("config")) ?? null;
        setConfig(saved);
        if (!saved) setShowSettings(true);
      } catch (e: unknown) {
        appendLog(`Store load error: ${describe(e)}`);
      }
    })();
  }, []);

  async function saveConfig(c: S3Config) {
    if (!store) return;
    await store.set("config", c);
    await store.save();
    setConfig(c);
    setShowSettings(false);
    appendLog("Saved S3 config.");
  }

  function getClient(): S3Client | null {
    if (!config) return null;
    return new S3Client({
      region: config.region,
      endpoint: config.endpoint || undefined,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      forcePathStyle: !!config.endpoint,
    });
  }

  async function push() {
    const client = getClient();
    if (!client || !config) return;
    setBusy(true);
    try {
      const heartbeat: Heartbeat = {
        deviceId: getDeviceId(),
        timestamp: new Date().toISOString(),
        message,
      };
      await client.send(
        new PutObjectCommand({
          Bucket: config.bucket,
          Key: HEARTBEAT_KEY,
          Body: JSON.stringify(heartbeat, null, 2),
          ContentType: "application/json",
        }),
      );
      appendLog(`Pushed heartbeat from ${heartbeat.deviceId.slice(0, 8)}.`);
    } catch (e: unknown) {
      appendLog(`Push error: ${describe(e)}`);
    } finally {
      setBusy(false);
    }
  }

  async function pull() {
    const client = getClient();
    if (!client || !config) return;
    setBusy(true);
    try {
      const out = await client.send(
        new GetObjectCommand({ Bucket: config.bucket, Key: HEARTBEAT_KEY }),
      );
      const text = await out.Body!.transformToString();
      const hb = JSON.parse(text) as Heartbeat;
      setPulled(hb);
      appendLog(`Pulled heartbeat from ${hb.deviceId.slice(0, 8)}.`);
    } catch (e: unknown) {
      appendLog(`Pull error: ${describe(e)}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <header>
        <h1>spike-sync</h1>
        <button onClick={() => setShowSettings((v) => !v)}>
          {showSettings ? "Close" : "Settings"}
        </button>
      </header>

      {showSettings && (
        <SettingsForm initial={config} onSave={saveConfig} />
      )}

      {!showSettings && (
        <>
          <section>
            <label>
              Message
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <div className="actions">
              <button onClick={push} disabled={busy || !config}>
                Push
              </button>
              <button onClick={pull} disabled={busy || !config}>
                Pull
              </button>
            </div>
            {!config && (
              <p className="hint">Open Settings to configure your S3 backend first.</p>
            )}
          </section>

          {pulled && (
            <section>
              <h2>Latest heartbeat</h2>
              <p>
                <strong>Device:</strong> <code>{pulled.deviceId.slice(0, 8)}</code>
                {pulled.deviceId === getDeviceId() && " (this device)"}
              </p>
              <p>
                <strong>Time:</strong> {new Date(pulled.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Message:</strong> {pulled.message}
              </p>
            </section>
          )}

          <section className="log">
            <h2>Log</h2>
            {log.length === 0 ? (
              <p className="hint">No activity yet.</p>
            ) : (
              <ul>
                {log.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}

function SettingsForm({
  initial,
  onSave,
}: {
  initial: S3Config | null;
  onSave: (c: S3Config) => void;
}) {
  const [endpoint, setEndpoint] = useState(initial?.endpoint ?? "");
  const [region, setRegion] = useState(initial?.region ?? "us-east-1");
  const [bucket, setBucket] = useState(initial?.bucket ?? "");
  const [accessKeyId, setAccessKeyId] = useState(initial?.accessKeyId ?? "");
  const [secretAccessKey, setSecretAccessKey] = useState(
    initial?.secretAccessKey ?? "",
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ endpoint, region, bucket, accessKeyId, secretAccessKey });
      }}
    >
      <label>
        Endpoint <small>(blank for AWS S3; e.g. http://localhost:9000 for MinIO)</small>
        <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
      </label>
      <label>
        Region
        <input
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        />
      </label>
      <label>
        Bucket
        <input
          value={bucket}
          onChange={(e) => setBucket(e.target.value)}
          required
        />
      </label>
      <label>
        Access Key ID
        <input
          value={accessKeyId}
          onChange={(e) => setAccessKeyId(e.target.value)}
          required
          autoComplete="off"
        />
      </label>
      <label>
        Secret Access Key
        <input
          type="password"
          value={secretAccessKey}
          onChange={(e) => setSecretAccessKey(e.target.value)}
          required
          autoComplete="off"
        />
      </label>
      <button type="submit">Save</button>
      <p className="hint">
        Stored in plain text in the app data directory. Phase 1 swaps to OS keychain.
      </p>
    </form>
  );
}

function describe(e: unknown): string {
  if (e instanceof Error) return e.message;
  return String(e);
}
