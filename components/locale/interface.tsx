type CalendarType = {
  today: string;
  view: Record<string, any>;
  month: {
    short: Record<string, any>;
    long: Record<string, any>;
  };
  week: {
    short: Record<string, any>;
    long: Record<string, any>;
  };
};

export interface Locale {
  locale: string;
  dayjsLocale?: string;
  Calendar: CalendarType;
  DatePicker: {
    Calendar: CalendarType;
    [key: string]: any;
  };
  Drawer: Record<string, any>;
  Empty: Record<string, any>;
  Modal: Record<string, any>;
  Pagination: Record<string, any>;
  Popconfirm: Record<string, any>;
  Table: Record<string, any>;
  TimePicker: Record<string, any>;
  Upload: Record<string, any>;
  Progress: Record<string, any>;
  Typography: Record<string, any>;
  Transfer: Record<string, any>;
  ImagePreview: Record<string, any>;
  Form?: Record<string, any>;
}
