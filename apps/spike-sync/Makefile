SPIKE_SYNC_DIR=apps/spike-sync

ss-install:
	cd $(SPIKE_SYNC_DIR) && npm install

ss-dev:
	cd $(SPIKE_SYNC_DIR) && npm run tauri dev

ss-build:
	cd $(SPIKE_SYNC_DIR) && npm run tauri build

ss-ios-init:
	cd $(SPIKE_SYNC_DIR) && npm run tauri ios init

ss-ios-dev:
	cd $(SPIKE_SYNC_DIR) && npm run tauri ios dev

ss-ios-dev-host:
	cd $(SPIKE_SYNC_DIR) && npm run tauri ios dev -- --host

ss-ios-build:
	cd $(SPIKE_SYNC_DIR) && npm run tauri ios build

ss-android-init:
	cd $(SPIKE_SYNC_DIR) && npm run tauri android init

ss-android-dev:
	cd $(SPIKE_SYNC_DIR) && npm run tauri android dev

ss-android-build:
	cd $(SPIKE_SYNC_DIR) && npm run tauri android build

ss-icons:
	cd $(SPIKE_SYNC_DIR) && node scripts/init-icons.mjs

ss-clean:
	cd $(SPIKE_SYNC_DIR) && rm -rf node_modules dist src-tauri/target src-tauri/gen
