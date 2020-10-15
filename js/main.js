function InitMyCustomJQuery() {
  $(document).ready(function () {
    $("body").toasty(),
      $("#toasty_button").click(function () {
        $("body").toasty("pop");
      });
  }),
    Marquee3k.init(),
    new WOW().init(),
    $(function () {
      var t = $(".arrowOn");
      $(window).scroll(function () {
        $(window).scrollTop() >= 10
          ? t.removeClass("arrowOn").addClass("arrowOff")
          : t.removeClass("arrowOff").addClass("arrowOn");
      });
    });
  var t = !1,
    e = !1;
  if (
    ($("#photoMe").hover(function () {
      (t = !0), $(".photoMe").removeClass("hidden");
    }),
    $(".photoMe img").hover(function () {
      e = !0;
    }),
    $(".photoMe").hover(function () {
      e = !0;
    }),
    $("#photoMe").mouseleave(function () {
      (t = !1),
        setTimeout(() => {
          e || $(".photoMe").addClass("hidden");
        }, 30);
    }),
    $(".photoMe").mouseleave(function () {
      setTimeout(() => {
        t || $(".photoMe").addClass("hidden");
      }, 30);
    }),
    $(".photoMe img").click(function () {
      (e = !1),
        setTimeout(() => {
          t || $(".photoMe").addClass("hidden");
        }, 30);
    }),
    $(window).width() >= 1024)
  ) {
    const t = {
        lerp: (t, e, s) => (1 - s) * t + s * e,
        norm: (t, e, s) => (t - e) / (s - e),
      },
      e = { height: window.innerHeight, width: window.innerWidth };
    class s {
      constructor() {
        this.bindMethods(),
          (this.data = { ease: 0.1, current: 0, last: 0 }),
          (this.dom = {
            el: document.querySelector("[data-scroll]"),
            content: document.querySelector("[data-scroll-content]"),
          }),
          (this.rAF = null),
          this.init();
      }
      bindMethods() {
        ["scroll", "run", "resize"].forEach(
          (t) => (this[t] = this[t].bind(this))
        );
      }
      setStyles() {
        (this.dom.el.style.position = "fixed"),
          (this.dom.el.style.top = 0),
          (this.dom.el.style.left = 0),
          (this.dom.el.style.height = "100%"),
          (this.dom.el.style.width = "100%"),
          (this.dom.el.style.overflow = "hidden");
      }
      setHeight() {
        document.body.style.height = `${this.dom.content.offsetHeight}px`;
      }
      resize() {
        this.setHeight(), this.scroll();
      }
      preload() {
        imagesLoaded(this.dom.content, (t) => {
          this.setHeight();
        });
      }
      scroll() {
        this.data.current = window.scrollY;
      }
      run() {
        (this.data.last = t.lerp(
          this.data.last,
          this.data.current,
          this.data.ease
        )),
          (this.data.last = Math.floor(100 * this.data.last) / 100),
          this.data.last < 0.1 && (this.data.last = 0);
        this.data.current, this.data.last, e.width;
        (this.dom.content.style.transform = `translate3d(0, -${this.data.last}px, 0)`),
          this.requestAnimationFrame();
      }
      on(t = !0) {
        this.setStyles(),
          this.setHeight(),
          this.addEvents(),
          t && this.requestAnimationFrame();
      }
      off(t = !0) {
        t && this.cancelAnimationFrame(), this.removeEvents();
      }
      requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run);
      }
      cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF);
      }
      destroy() {
        (document.body.style.height = ""),
          (this.data = null),
          this.removeEvents(),
          this.cancelAnimationFrame();
      }
      resize() {
        this.setHeight();
      }
      addEvents() {
        window.addEventListener("resize", this.resize, { passive: !0 }),
          window.addEventListener("scroll", this.scroll, { passive: !0 });
      }
      removeEvents() {
        window.removeEventListener("resize", this.resize, { passive: !0 }),
          window.removeEventListener("scroll", this.scroll, { passive: !0 });
      }
      init() {
        this.preload(), this.on();
      }
    }
    new s();
  }
  {
    document.body, document.documentElement;
    const t = (t, e, s, i, o) => {
        var n = (t - e) / (s - i);
        return n * o + (e - n * i);
      },
      e = (t, e, s) => (1 - s) * t + s * e,
      s = (t, e, s, i) => {
        var o = t - e,
          n = s - i;
        return Math.hypot(o, n);
      },
      i = (t) => {
        let e = 0,
          s = 0;
        return (
          t || (t = window.event),
          t.pageX || t.pageY
            ? ((e = t.pageX), (s = t.pageY))
            : (t.clientX || t.clientY) &&
              ((e =
                t.clientX +
                document.body.scrollLeft +
                document.documentElement.scrollLeft),
              (s =
                t.clientY +
                document.body.scrollTop +
                document.documentElement.scrollTop)),
          { x: e, y: s }
        );
      };
    let o;
    const n = () =>
      (o = { width: window.innerWidth, height: window.innerHeight });
    n(), window.addEventListener("resize", n);
    const a = document.querySelector("feDisplacementMap");
    class r {
      constructor() {
        (this.DOM = {
          svg: document.querySelector("svg.distort"),
          menu: document.querySelector("div.works"),
        }),
          (this.DOM.imgs = [...this.DOM.svg.querySelectorAll("g > image")]),
          (this.DOM.menuLinks = [
            ...this.DOM.menu.querySelectorAll(".work__link"),
          ]),
          (this.mousePos = { x: o.width / 2, y: o.height / 2 }),
          (this.lastMousePos = {
            translation: { x: o.width / 2, y: o.height / 2 },
            displacement: { x: 0, y: 0 },
          }),
          (this.dmScale = 0),
          (this.current = -1),
          this.initEvents(),
          requestAnimationFrame(() => this.render());
      }
      initEvents() {
        window.addEventListener("mousemove", (t) => (this.mousePos = i(t))),
          this.DOM.menuLinks.forEach((t, e) => {
            t.addEventListener("mouseenter", () => {
              (this.current = e),
                TweenMax.to(this.DOM.imgs[this.current], 0.5, {
                  ease: Quad.easeOut,
                  opacity: 1,
                });
            }),
              t.addEventListener("mouseleave", () => {
                TweenMax.to(this.DOM.imgs[this.current], 0.5, {
                  ease: Quad.easeOut,
                  opacity: 0,
                });
              });
          });
      }
      render() {
        (this.lastMousePos.translation.x = e(
          this.lastMousePos.translation.x,
          this.mousePos.x,
          0.15
        )),
          (this.lastMousePos.translation.y = e(
            this.lastMousePos.translation.y,
            this.mousePos.y,
            0.15
          )),
          (this.DOM.svg.style.transform = `translateX(${
            this.lastMousePos.translation.x - o.width / 2
          }px) translateY(${
            this.lastMousePos.translation.y - o.height / 2
          }px)`),
          (this.lastMousePos.displacement.x = e(
            this.lastMousePos.displacement.x,
            this.mousePos.x,
            0.07
          )),
          (this.lastMousePos.displacement.y = e(
            this.lastMousePos.displacement.y,
            this.mousePos.y,
            0.07
          ));
        const i = s(
          this.lastMousePos.displacement.x,
          this.mousePos.x,
          this.lastMousePos.displacement.y,
          this.mousePos.y
        );
        (this.dmScale = Math.min(t(50, 0, 100, 0, i), 50)),
          (a.scale.baseVal = this.dmScale),
          requestAnimationFrame(() => this.render());
      }
    }
    new r();
  }
}
$(function () {
  "use strict";
  var t = {
      prefetch: !0,
      cacheLength: 2,
      onStart: {
        duration: 1300,
        render: function (t) {
          t.addClass("is-exiting"), e.restartCSSAnimations();
        },
      },
      onProgress: {
        duration: 0,
        render: function (t) {
          $(".spinner").show(100);
        },
      },
      onReady: {
        duration: 0,
        render: function (t, e) {
          t.removeClass("is-exiting"), t.html(e), InitMyCustomJQuery();
        },
      },
    },
    e = $("#main").smoothState(t).data("smoothState");
}),
  $(document).ready(function () {
    InitMyCustomJQuery();
  });
