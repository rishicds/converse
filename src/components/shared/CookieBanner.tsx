"use client"
import { useEffect, useState } from "react";

const COOKIE_STORAGE_KEY = "converse_cookie_prefs";
const LEGACY_ACCEPTED_KEY = "converse_cookies_accepted"; // previously stored as "1"

type CookiePrefs = {
  essential: boolean; // always true in practice
  analytics: boolean;
  marketing: boolean;
  preference: boolean;
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({
    essential: true,
    analytics: false,
    marketing: false,
    preference: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
      const legacy = localStorage.getItem(LEGACY_ACCEPTED_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // ensure essential is true always
        setPrefs({ essential: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing, preference: !!parsed.preference });
        setVisible(false);
        return;
      }
      if (legacy === "1") {
        // old behavior: if previously accepted, treat as all accepted
        const acceptedAll = { essential: true, analytics: true, marketing: true, preference: true };
        try { localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(acceptedAll)); } catch (e) {}
        setPrefs(acceptedAll);
        setVisible(false);
        return;
      }
      setVisible(true);
    } catch (e) {
      // If localStorage isn't available, show the banner so user can accept/learn
      setVisible(true);
    }
  }, []);

  function savePrefs(p: CookiePrefs) {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(p));
    } catch (e) {
      // ignore storage errors
    }
    setPrefs(p);
    setVisible(false);
    setShowManage(false);
  }

  function acceptAll() {
    const all: CookiePrefs = { essential: true, analytics: true, marketing: true, preference: true };
    savePrefs(all);
  }

  function rejectAll() {
    const none: CookiePrefs = { essential: true, analytics: false, marketing: false, preference: false };
    savePrefs(none);
  }

  function downloadPrivacyPolicy() {
    const link = document.createElement('a');
    link.href = '/pptos.docx';
    link.download = 'Privacy-Policy.docx';
    link.click();
  }

  if (!visible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${showManage ? 'left-4 md:left-auto md:max-w-2xl' : 'max-w-md'} transition-all duration-300`}>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200">
        {!showManage ? (
          // Initial banner view
          <div className="p-5 md:p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900 mb-1.5">Cookie Preferences</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We use cookies to improve your experience. 
                    See our{' '}
                    <button 
                      onClick={downloadPrivacyPolicy}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                    >
                      Privacy Policy
                    </button>.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={acceptAll}
                  className="w-full bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-900 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Accept All
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={rejectAll}
                    className="flex-1 bg-white text-slate-700 border border-slate-300 px-3 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={() => setShowManage(true)}
                    className="flex-1 bg-white text-slate-700 border border-slate-300 px-3 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Manage cookies panel
          <>
            <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Cookie Settings</h2>
              <button 
                onClick={() => setShowManage(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 hover:bg-slate-100 rounded-lg"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* Essential Cookies */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-900 mb-1">Essential Cookies</h3>
                    <span className="inline-block px-2 py-0.5 bg-slate-200 text-slate-700 text-xs font-medium rounded-full">Always Active</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                  These cookies are necessary for the website to function properly and cannot be turned off.
                </p>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Session management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Security and authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Load balancing and performance optimization</span>
                  </li>
                </ul>
                <p className="mt-2 text-xs text-slate-500 italic">(No tracking occurs here.)</p>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-900 mb-1.5">Analytics & Performance</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Help us understand visitor interactions and improve user experience.
                    </p>
                  </div>
                </div>

                <div className="mt-3 overflow-x-auto -mx-2 px-2">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-2 px-2 font-semibold text-slate-700 min-w-[100px]">Purpose</th>
                        <th className="text-left py-2 px-2 font-semibold text-slate-700 min-w-[140px]">Description</th>
                        <th className="text-left py-2 px-2 font-semibold text-slate-700 min-w-[120px]">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2 text-slate-700 font-medium">Page Views</td>
                        <td className="py-2 px-2 text-slate-600">Tracks pages visited</td>
                        <td className="py-2 px-2 text-slate-500">URLs, flow</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2 text-slate-700 font-medium">Time on Page</td>
                        <td className="py-2 px-2 text-slate-600">Measures engagement</td>
                        <td className="py-2 px-2 text-slate-500">Duration, scroll</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2 text-slate-700 font-medium">Top Pages</td>
                        <td className="py-2 px-2 text-slate-600">Most visited pages</td>
                        <td className="py-2 px-2 text-slate-500">Page IDs, counts</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2 text-slate-700 font-medium">Button Clicks</td>
                        <td className="py-2 px-2 text-slate-600">CTA interactions</td>
                        <td className="py-2 px-2 text-slate-500">IDs, timestamps</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2 text-slate-700 font-medium">Scroll Depth</td>
                        <td className="py-2 px-2 text-slate-600">How far users scroll</td>
                        <td className="py-2 px-2 text-slate-500">%, position</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2 text-slate-700 font-medium">Entry/Exit</td>
                        <td className="py-2 px-2 text-slate-600">Start and leave pages</td>
                        <td className="py-2 px-2 text-slate-500">Landing, exit</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2 text-slate-700 font-medium">Referrals</td>
                        <td className="py-2 px-2 text-slate-600">Traffic sources</td>
                        <td className="py-2 px-2 text-slate-500">Referrer, campaigns</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2 text-slate-700 font-medium">Video</td>
                        <td className="py-2 px-2 text-slate-600">Video interactions</td>
                        <td className="py-2 px-2 text-slate-500">Play, completion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <label className="flex items-center gap-2.5 mt-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="w-4 h-4 text-slate-800 border-2 border-slate-300 rounded focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    Enable Analytics Cookies
                  </span>
                </label>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <div className="mb-2">
                  <h3 className="text-base font-semibold text-slate-900 mb-1.5">Marketing Cookies</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Used to deliver relevant ads or track conversions from campaigns.
                  </p>
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="w-4 h-4 text-slate-800 border-2 border-slate-300 rounded focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    Enable Marketing Cookies
                  </span>
                </label>
              </div>

              {/* Preference Cookies */}
              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <div className="mb-2">
                  <h3 className="text-base font-semibold text-slate-900 mb-1.5">Preference Cookies</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Remember user settings like preferred language, theme, or location.
                  </p>
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={prefs.preference}
                    onChange={(e) => setPrefs(prev => ({ ...prev, preference: e.target.checked }))}
                    className="w-4 h-4 text-slate-800 border-2 border-slate-300 rounded focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    Enable Preference Cookies
                  </span>
                </label>
              </div>
            </div>

            {/* Sticky footer with action buttons */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-5 py-3">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => savePrefs(prefs)}
                  className="w-full bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-900 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Save Preferences
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={rejectAll}
                    className="flex-1 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                  >
                    Reject All
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
