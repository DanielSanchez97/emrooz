interface Step {
  title: string;
  body: string;
  media?: {
    src: string; // path under public/, e.g. /media/export-guide/01-settings.png
    kind: "image" | "video";
    alt?: string;
  };
}

// Order matches the flow in Instagram's mobile app. Edit paths / swap kinds
// as you drop screenshots and recordings into public/media/export-guide/.
// If a file is missing at runtime, the <img> / <video> falls back to a
// neutral placeholder below.
const steps: Step[] = [
  {
    title: "Open Settings and activity",
    body: "In the Instagram app, tap your profile icon, then the hamburger menu in the top right, and select Settings and activity. At the top you'll see Accounts Center — tap it.",
    media: {
      src: "/media/export-guide/step_1_settings.png",
      kind: "image",
      alt: "Settings and activity screen showing Accounts Center at the top",
    },
  },
  {
    title: "Go to Your information and permissions",
    body: "In Accounts Center, scroll down and tap Your information and permissions.",
    media: {
      src: "/media/export-guide/step_2_account_center.png",
      kind: "image",
      alt: "Accounts Center with Your information and permissions highlighted",
    },
  },
  {
    title: "Export your information",
    body: "Tap Export your information. This will open the export flow in your browser.",
    media: {
      src: "/media/export-guide/step_3_export_data_section.png",
      kind: "image",
      alt: "Your information and permissions screen with Export your information",
    },
  },
  {
    title: "Export to device",
    body: "Choose Export to device so the data downloads directly to your phone.",
    media: {
      src: "/media/export-guide/step_4_export_to_device.png",
      kind: "image",
      alt: "Choosing Export to device",
    },
  },
  {
    title: "Select Followers and following",
    body: "Tap Customize information and under the Connections section, make sure Followers and following is checked. You can uncheck everything else — that's all the analyzer needs.",
    media: {
      src: "/media/export-guide/step_5_select_contact_information.png",
      kind: "image",
      alt: "Selecting Followers and following under Connections",
    },
  },
  {
    title: "Set date range to All time",
    body: "Tap Date range and select All time so you get your complete follower and following history.",
    media: {
      src: "/media/export-guide/step_6_time_range.png",
      kind: "image",
      alt: "Selecting All time for date range",
    },
  },
  {
    title: "Set format to JSON",
    body: "Tap Format and select JSON. The analyzer can't read HTML exports, so this step is important.",
    media: {
      src: "/media/export-guide/step_7_json_data.png",
      kind: "image",
      alt: "Selecting JSON format",
    },
  },
  {
    title: "Confirm and review your export",
    body: "You should see a confirmation screen showing your export settings: Export to Device, the information you selected, All time date range, and JSON format. Tap Create export to submit the request.",
    media: {
      src: "/media/export-guide/step_5_all_information.png",
      kind: "image",
      alt: "Export confirmation screen showing all settings",
    },
  },
  {
    title: "Download the .zip",
    body: "Instagram will notify you when your export is ready — usually within a few minutes. Head back to the Available downloads section and tap Download. You'll have 4 days before the link expires. Once the .zip is on your phone, come back to the Analyzer and upload it directly — no need to extract it first.",
    media: {
      src: "/media/export-guide/step_8_completed_data.png",
      kind: "image",
      alt: "Available downloads showing completed exports ready to download",
    },
  },
];

function StepMedia({ media }: { media: NonNullable<Step["media"]> }) {
  if (media.kind === "video") {
    return (
      <video
        controls
        preload="metadata"
        className="w-full rounded-lg border border-cream-muted/10"
      >
        <source src={media.src} />
      </video>
    );
  }
  return (
    <img
      src={media.src}
      alt={media.alt ?? ""}
      loading="lazy"
      className="w-full rounded-lg border border-cream-muted/10"
      onError={(e) => {
        // Show a subtle placeholder if the file hasn't been added yet.
        const el = e.currentTarget;
        el.replaceWith(
          Object.assign(document.createElement("div"), {
            className:
              "w-full rounded-lg border border-dashed border-cream-muted/20 bg-navy-light/30 text-cream-muted/50 text-sm px-4 py-10 text-center",
            textContent: `(media coming soon — drop ${media.src.split("/").pop()} into public${media.src.replace(/\/[^/]+$/, "")}/)`,
          }),
        );
      }}
    />
  );
}

export function HowToExport() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <header>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-cream mb-3">
          How to export your Instagram data
        </h1>
        <p className="text-cream-muted/70">
          Instagram lets you export your follower and following data directly
          from the app. The whole process takes just a few minutes. Once you
          have the .zip file, come back to the Analyzer tab and upload it
          — everything is processed locally in your browser, nothing leaves
          your device.
        </p>
      </header>

      <ol className="space-y-12">
        {steps.map((step, i) => (
          <li key={i} className="grid md:grid-cols-[auto_1fr] gap-6">
            <div className="md:w-10 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gold text-navy font-semibold flex items-center justify-center">
                {i + 1}
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-cream">{step.title}</h2>
              <p className="text-cream-muted/80">{step.body}</p>
              {step.media && <StepMedia media={step.media} />}
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-xl bg-navy-light/40 border border-cream-muted/10 p-5 text-sm text-cream-muted/80">
        <div className="font-medium text-cream mb-1">
          Can't find the setting?
        </div>
        <p>
          Instagram moves things around regularly. The request lives in{" "}
          <strong>Accounts Center</strong>, which is shared across Instagram,
          Facebook, and Threads — you can also reach it from{" "}
          <a
            href="https://accountscenter.instagram.com/info_and_permissions/dyi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            accountscenter.instagram.com
          </a>{" "}
          in a browser.
        </p>
      </div>
    </div>
  );
}
