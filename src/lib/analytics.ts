const GA_MEASUREMENT_ID = "G-LDT74FLHLZ";
const APP_NAME = "mrh_portfolio";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;
type PageViewParams = AnalyticsParams & {
  page_path: string;
  route_name: string;
};
type ClickParams = AnalyticsParams & {
  element_name: string;
  element_type: string;
  element_location?: string;
  destination?: string;
  outbound?: boolean;
};

declare global {
  interface Window {
    gtag?: {
      (command: "config", measurementId: string, params?: AnalyticsParams): void;
      (command: "event", eventName: string, params?: AnalyticsParams): void;
    };
  }
}

const canTrack = () =>
  typeof window !== "undefined" && typeof window.gtag === "function";

const withCommonParams = (params: AnalyticsParams = {}): AnalyticsParams => ({
  app_name: APP_NAME,
  page_path:
    typeof window === "undefined"
      ? undefined
      : `${window.location.pathname}${window.location.search}`,
  page_title: typeof document === "undefined" ? undefined : document.title,
  ...params,
});

export const trackPageView = (params: PageViewParams) => {
  if (!canTrack()) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    ...withCommonParams(params),
    page_location: window.location.href,
  });
};

export const trackEvent = (eventName: string, params?: AnalyticsParams) => {
  if (!canTrack()) {
    return;
  }

  window.gtag("event", eventName, withCommonParams(params));
};

export const trackClick = (eventName: string, params: ClickParams) => {
  trackEvent(eventName, params);
};
