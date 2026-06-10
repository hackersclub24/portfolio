type ScrollSmootherConfig = {
  wrapper?: string;
  content?: string;
  smooth?: number;
  speed?: number;
  effects?: boolean;
  autoResize?: boolean;
  ignoreMobileResize?: boolean;
};

export class ScrollSmoother {
  private _paused = false;

  static create(_config: ScrollSmootherConfig) {
    return new ScrollSmoother();
  }

  static refresh(_force?: boolean) {
    return undefined;
  }

  scrollTop(_value?: number) {
    return window.scrollY;
  }

  paused(value?: boolean) {
    if (typeof value === "boolean") {
      this._paused = value;
    }

    return this._paused;
  }

  scrollTo(target: string | Element | null | undefined, _smooth?: boolean, _position?: string) {
    if (!target) {
      return;
    }

    const element = typeof target === "string" ? document.querySelector(target) : target;
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}