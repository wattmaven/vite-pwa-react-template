import { useRegisterSW } from "virtual:pwa-register/react";

export default function PWABadge() {
  // check for updates every hour
  const period = 60 * 60 * 1000;

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === "activated") registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <div
      className="m-0 h-0 w-0 p-0"
      role="alert"
      aria-labelledby="toast-message"
    >
      {(offlineReady || needRefresh) && (
        <div className="fixed right-0 bottom-0 z-10 m-4 rounded border border-gray-300/50 bg-white p-3 text-left shadow-md">
          <div className="mb-2">
            {offlineReady ? (
              <span id="toast-message">App ready to work offline</span>
            ) : (
              <span id="toast-message">
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          <div className="flex">
            {needRefresh && (
              <button
                className="mr-1 rounded border border-gray-300/50 px-3 py-1 outline-none"
                onClick={() => {
                  void updateServiceWorker(true);
                }}
              >
                Reload
              </button>
            )}
            <button
              className="rounded border border-gray-300/50 px-3 py-1 outline-none"
              onClick={() => close()}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration,
) {
  if (period <= 0) return;

  setInterval(() => {
    // Wrap in a non-async function
    void (async () => {
      if ("onLine" in navigator && !navigator.onLine) return;

      try {
        const resp = await fetch(swUrl, {
          cache: "no-store",
          headers: {
            cache: "no-store",
            "cache-control": "no-cache",
          },
        });

        if (resp?.status === 200) await r.update();
      } catch (error) {
        console.error("Periodic sync check failed:", error);
      }
    })();
  }, period);
}
