/*! animsition */
!(function(t) {
  'use strict';
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' == typeof exports
    ? (module.exports = t(require('jquery')))
    : t(jQuery);
})(function(t) {
  'use strict';
  var n = 'animsition',
    i = {
      init: function(a) {
        (a = t.extend(
          {
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 1500,
            outDuration: 800,
            linkElement: '.animsition-link',
            loading: !0,
            loadingParentElement: 'body',
            loadingClass: 'animsition-loading',
            loadingInner: '',
            timeout: !1,
            timeoutCountdown: 5e3,
            onLoadEvent: !0,
            browser: ['animation-duration', '-webkit-animation-duration'],
            overlay: !1,
            overlayClass: 'animsition-overlay-slide',
            overlayParentElement: 'body',
            transition: function(t) {
              window.location.href = t;
            }
          },
          a
        )),
          (i.settings = {
            timer: !1,
            data: {
              inClass: 'animsition-in-class',
              inDuration: 'animsition-in-duration',
              outClass: 'animsition-out-class',
              outDuration: 'animsition-out-duration',
              overlay: 'animsition-overlay'
            },
            events: {
              inStart: 'animsition.inStart',
              inEnd: 'animsition.inEnd',
              outStart: 'animsition.outStart',
              outEnd: 'animsition.outEnd'
            }
          });
        var o = i.supportCheck.call(this, a);
        return o || !(a.browser.length > 0) || (o && this.length)
          ? (i.optionCheck.call(this, a) &&
              t('.' + a.overlayClass).length <= 0 &&
              i.addOverlay.call(this, a),
            a.loading &&
              t('.' + a.loadingClass).length <= 0 &&
              i.addLoading.call(this, a),
            this.each(function() {
              var o = this,
                e = t(this),
                s = t(window),
                l = t(document);
              e.data(n) ||
                ((a = t.extend({}, a)),
                e.data(n, { options: a }),
                a.timeout && i.addTimer.call(o),
                a.onLoadEvent &&
                  s.on('load.' + n, function() {
                    i.settings.timer && clearTimeout(i.settings.timer),
                      i.in.call(o);
                  }),
                s.on('pageshow.' + n, function(t) {
                  t.originalEvent.persisted && i.in.call(o);
                }),
                s.on('unload.' + n, function() {}),
                l.on('click.' + n, a.linkElement, function(n) {
                  n.preventDefault();
                  var a = t(this),
                    e = a.attr('href');
                  2 === n.which ||
                  n.metaKey ||
                  n.shiftKey ||
                  (-1 !== navigator.platform.toUpperCase().indexOf('WIN') &&
                    n.ctrlKey)
                    ? window.open(e, '_blank')
                    : i.out.call(o, a, e);
                }));
            }))
          : ('console' in window ||
              ((window.console = {}),
              (window.console.log = function(t) {
                return t;
              })),
            this.length ||
              console.log('Animsition: Element does not exist on page.'),
            o || console.log('Animsition: Does not support this browser.'),
            i.destroy.call(this));
      },
      addOverlay: function(n) {
        t(n.overlayParentElement).prepend(
          '<div class="' + n.overlayClass + '"></div>'
        );
      },
      addLoading: function(n) {
        t(n.loadingParentElement).append(
          '<div class="' + n.loadingClass + '">' + n.loadingInner + '</div>'
        );
      },
      removeLoading: function() {
        var i = t(this).data(n).options;
        t(i.loadingParentElement)
          .children('.' + i.loadingClass)
          .fadeOut()
          .remove();
      },
      addTimer: function() {
        var a = this,
          o = t(this).data(n).options;
        i.settings.timer = setTimeout(function() {
          i.in.call(a), t(window).off('load.' + n);
        }, o.timeoutCountdown);
      },
      supportCheck: function(n) {
        var i = t(this),
          a = n.browser,
          o = a.length,
          e = !1;
        0 === o && (e = !0);
        for (var s = 0; s < o; s++)
          if ('string' == typeof i.css(a[s])) {
            e = !0;
            break;
          }
        return e;
      },
      optionCheck: function(n) {
        var a = t(this);
        return !(!n.overlay && !a.data(i.settings.data.overlay));
      },
      animationCheck: function(i, a, o) {
        var e = t(this).data(n).options,
          s = typeof i,
          l = !a && 'number' === s,
          r = a && 'string' === s && i.length > 0;
        return (
          l || r
            ? (i = i)
            : a && o
            ? (i = e.inClass)
            : !a && o
            ? (i = e.inDuration)
            : a && !o
            ? (i = e.outClass)
            : a || o || (i = e.outDuration),
          i
        );
      },
      in: function() {
        var a = this,
          o = t(this),
          e = o.data(n).options,
          s = o.data(i.settings.data.inDuration),
          l = o.data(i.settings.data.inClass),
          r = i.animationCheck.call(a, s, !1, !0),
          d = i.animationCheck.call(a, l, !0, !0),
          u = i.optionCheck.call(a, e),
          c = o.data(n).outClass;
        e.loading && i.removeLoading.call(a),
          c && o.removeClass(c),
          u ? i.inOverlay.call(a, d, r) : i.inDefault.call(a, d, r);
      },
      inDefault: function(n, a) {
        var o = t(this);
        o.css({ 'animation-duration': a + 'ms' })
          .addClass(n)
          .trigger(i.settings.events.inStart)
          .animateCallback(function() {
            o.removeClass(n)
              .css({ opacity: 1 })
              .trigger(i.settings.events.inEnd);
          });
      },
      inOverlay: function(a, o) {
        var e = t(this),
          s = e.data(n).options;
        e.css({ opacity: 1 }).trigger(i.settings.events.inStart),
          t(s.overlayParentElement)
            .children('.' + s.overlayClass)
            .css({ 'animation-duration': o + 'ms' })
            .addClass(a)
            .animateCallback(function() {
              e.trigger(i.settings.events.inEnd);
            });
      },
      out: function(a, o) {
        var e = this,
          s = t(this),
          l = s.data(n).options,
          r = a.data(i.settings.data.outClass),
          d = s.data(i.settings.data.outClass),
          u = a.data(i.settings.data.outDuration),
          c = s.data(i.settings.data.outDuration),
          m = r || d,
          g = u || c,
          f = i.animationCheck.call(e, m, !0, !1),
          h = i.animationCheck.call(e, g, !1, !1),
          v = i.optionCheck.call(e, l);
        (s.data(n).outClass = f),
          v ? i.outOverlay.call(e, f, h, o) : i.outDefault.call(e, f, h, o);
      },
      outDefault: function(a, o, e) {
        var s = t(this),
          l = s.data(n).options;
        s.css({ 'animation-duration': o + 1 + 'ms' })
          .addClass(a)
          .trigger(i.settings.events.outStart)
          .animateCallback(function() {
            s.trigger(i.settings.events.outEnd), l.transition(e);
          });
      },
      outOverlay: function(a, o, e) {
        var s = t(this),
          l = s.data(n).options,
          r = s.data(i.settings.data.inClass),
          d = i.animationCheck.call(this, r, !0, !0);
        t(l.overlayParentElement)
          .children('.' + l.overlayClass)
          .css({ 'animation-duration': o + 1 + 'ms' })
          .removeClass(d)
          .addClass(a)
          .trigger(i.settings.events.outStart)
          .animateCallback(function() {
            s.trigger(i.settings.events.outEnd), l.transition(e);
          });
      },
      destroy: function() {
        return this.each(function() {
          var i = t(this);
          t(window).off('.' + n), i.css({ opacity: 1 }).removeData(n);
        });
      }
    };
  (t.fn.animateCallback = function(n) {
    var i = 'animationend webkitAnimationEnd';
    return this.each(function() {
      var a = t(this);
      a.on(i, function() {
        return a.off(i), n.call(this);
      });
    });
  }),
    (t.fn.animsition = function(a) {
      return i[a]
        ? i[a].apply(this, Array.prototype.slice.call(arguments, 1))
        : 'object' != typeof a && a
        ? void t.error('Method ' + a + ' does not exist on jQuery.' + n)
        : i.init.apply(this, arguments);
    });
});
/*! Tipper */
!(function(a) {
  'use strict';
  function b(b) {
    return (
      (h.formatter = d),
      a(this)
        .not('.tipper-attached')
        .addClass('tipper-attached')
        .on('mouseenter.tipper', a.extend({}, h, b || {}), c)
    );
  }
  function c(b) {
    g = a('body');
    var c = a(this),
      d = a.extend(!0, {}, b.data, c.data('tipper-options')),
      h = '';
    (h += '<div class="tipper ' + d.direction + '">'),
      (h += '<div class="tipper-content">'),
      (h += d.formatter.apply(g, [c])),
      (h += '<span class="tipper-caret"</span>'),
      (h += '</div>'),
      (h += '</div>'),
      (d.$target = c),
      (d.$tipper = a(h)),
      g.append(d.$tipper),
      (d.$content = d.$tipper.find('.tipper-content')),
      (d.$caret = d.$tipper.find('.tipper-caret')),
      (d.offset = c.offset()),
      (d.height = c.outerHeight()),
      (d.width = c.outerWidth()),
      (d.tipperPos = {}),
      (d.caretPos = {}),
      (d.contentPos = {});
    var i = d.$caret.outerHeight(!0),
      j = d.$caret.outerWidth(!0),
      k = d.$content.outerHeight(!0),
      l = d.$content.outerWidth(!0) + j;
    'right' === d.direction || 'left' === d.direction
      ? ((d.caretPos.top = (k - i) / 2),
        (d.contentPos.top = -k / 2),
        'right' === d.direction
          ? (d.contentPos.left = j + d.margin)
          : 'left' === d.direction && (d.contentPos.left = -(l + d.margin)))
      : ((d.caretPos.left = (l - j) / 2),
        (d.contentPos.left = -l / 2),
        'bottom' === d.direction
          ? (d.contentPos.top = d.margin)
          : 'top' === d.direction && (d.contentPos.top = -(k + d.margin))),
      d.$content.css(d.contentPos),
      d.$caret.css(d.caretPos),
      d.follow
        ? d.$target.on('mousemove.tipper', d, e).trigger('mousemove')
        : ('right' === d.direction || 'left' === d.direction
            ? ((d.tipperPos.top = d.offset.top + d.height / 2),
              'right' === d.direction
                ? (d.tipperPos.left = d.offset.left + d.width)
                : 'left' === d.direction && (d.tipperPos.left = d.offset.left))
            : ((d.tipperPos.left = d.offset.left + d.width / 2),
              'bottom' === d.direction
                ? (d.tipperPos.top = d.offset.top + d.height)
                : 'top' === d.direction && (d.tipperPos.top = d.offset.top)),
          d.$tipper.css(d.tipperPos)),
      d.$target.one('mouseleave.tipper', d, f);
  }
  function d(a) {
    return a.data('title');
  }
  function e(a) {
    var b = a.data;
    b.$tipper.css({ left: a.pageX, top: a.pageY });
  }
  function f(a) {
    var b = a.data;
    b.$tipper.remove(), b.$target.off('mousemove.tipper mouseleave.tipper');
  }
  var g,
    h = { direction: 'top', follow: !1, formatter: a.noop, margin: 15 },
    i = {
      defaults: function(b) {
        return (h = a.extend(h, b || {})), a(this);
      },
      destroy: function() {
        return a(this)
          .trigger('mouseleave.tipper')
          .off('.tipper')
          .removeClass('tipper-attached');
      }
    };
  (a.fn.tipper = function(a) {
    return i[a]
      ? i[a].apply(this, Array.prototype.slice.call(arguments, 1))
      : 'object' != typeof a && a
      ? this
      : b.apply(this, arguments);
  }),
    (a.tipper = function(a) {
      'defaults' === a &&
        i.defaults.apply(this, Array.prototype.slice.call(arguments, 1));
    });
})(jQuery);
/*! primary navigation slide-in effect & open/close primary navigation */
jQuery(document).ready(function(i) {
  if (i(window).width() > 1170) {
    var s = i('.cd-header').height();
    i(window).on('scroll', { previousTop: 0 }, function() {
      var e = i(window).scrollTop();
      e < this.previousTop
        ? e > 0 && i('.cd-header').hasClass('is-fixed')
          ? i('.cd-header').addClass('is-visible')
          : i('.cd-header').removeClass('is-visible is-fixed')
        : (i('.cd-header').removeClass('is-visible'),
          e > s &&
            !i('.cd-header').hasClass('is-fixed') &&
            i('.cd-header').addClass('is-fixed')),
        (this.previousTop = e);
    });
  }
  i('.cd-primary-nav-trigger').on('click', function() {
    i('.cd-menu-icon').toggleClass('is-clicked'),
      i('.cd-header').toggleClass('menu-is-open'),
      i('.cd-primary-nav').hasClass('is-visible')
        ? i('.cd-primary-nav')
            .removeClass('is-visible')
            .one(
              'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
              function() {
                i('body').removeClass('overflow-hidden');
              }
            )
        : i('.cd-primary-nav')
            .addClass('is-visible')
            .one(
              'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
              function() {
                i('body').addClass('overflow-hidden');
              }
            );
  });
});
/*! SubNav Open/Close */

function openNav() {
  document.getElementById('myNav').style.height = '100%';
}
function closeNav() {
  document.getElementById('myNav').style.height = '0%';
}
/*! Retina */
!(function() {
  function a() {}
  function b(a) {
    return f.retinaImageSuffix + a;
  }
  function c(a, c) {
    if (((this.path = a || ''), 'undefined' != typeof c && null !== c))
      (this.at_2x_path = c), (this.perform_check = !1);
    else {
      if (void 0 !== document.createElement) {
        var d = document.createElement('a');
        (d.href = this.path),
          (d.pathname = d.pathname.replace(g, b)),
          (this.at_2x_path = d.href);
      } else {
        var e = this.path.split('?');
        (e[0] = e[0].replace(g, b)), (this.at_2x_path = e.join('?'));
      }
      this.perform_check = !0;
    }
  }
  function d(a) {
    (this.el = a),
      (this.path = new c(
        this.el.getAttribute('src'),
        this.el.getAttribute('data-at2x')
      ));
    var b = this;
    this.path.check_2x_variant(function(a) {
      a && b.swap();
    });
  }
  var e = 'undefined' == typeof exports ? window : exports,
    f = {
      retinaImageSuffix: '@2x',
      check_mime_type: !0,
      force_original_dimensions: !0
    };
  (e.Retina = a),
    (a.configure = function(a) {
      null === a && (a = {});
      for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b]);
    }),
    (a.init = function(a) {
      null === a && (a = e);
      var b = a.onload || function() {};
      a.onload = function() {
        var a,
          c,
          e = document.getElementsByTagName('img'),
          f = [];
        for (a = 0; a < e.length; a += 1)
          (c = e[a]), c.getAttributeNode('data-no-retina') || f.push(new d(c));
        b();
      };
    }),
    (a.isRetina = function() {
      var a =
        '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
      return e.devicePixelRatio > 1
        ? !0
        : e.matchMedia && e.matchMedia(a).matches
        ? !0
        : !1;
    });
  var g = /\.\w+$/;
  (e.RetinaImagePath = c),
    (c.confirmed_paths = []),
    (c.prototype.is_external = function() {
      return !(
        !this.path.match(/^https?\:/i) ||
        this.path.match('//' + document.domain)
      );
    }),
    (c.prototype.check_2x_variant = function(a) {
      var b,
        d = this;
      return this.is_external()
        ? a(!1)
        : this.perform_check ||
          'undefined' == typeof this.at_2x_path ||
          null === this.at_2x_path
        ? this.at_2x_path in c.confirmed_paths
          ? a(!0)
          : ((b = new XMLHttpRequest()),
            b.open('HEAD', this.at_2x_path),
            (b.onreadystatechange = function() {
              if (4 !== b.readyState) return a(!1);
              if (b.status >= 200 && b.status <= 399) {
                if (f.check_mime_type) {
                  var e = b.getResponseHeader('Content-Type');
                  if (null === e || !e.match(/^image/i)) return a(!1);
                }
                return c.confirmed_paths.push(d.at_2x_path), a(!0);
              }
              return a(!1);
            }),
            b.send(),
            void 0)
        : a(!0);
    }),
    (e.RetinaImage = d),
    (d.prototype.swap = function(a) {
      function b() {
        c.el.complete
          ? (f.force_original_dimensions &&
              (c.el.setAttribute('width', c.el.offsetWidth),
              c.el.setAttribute('height', c.el.offsetHeight)),
            c.el.setAttribute('src', a))
          : setTimeout(b, 5);
      }
      'undefined' == typeof a && (a = this.path.at_2x_path);
      var c = this;
      b();
    }),
    a.isRetina() && a.init(e);
})(); /*! TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin */
var _gsScope =
  'undefined' != typeof module && module.exports && 'undefined' != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  'use strict';
  var t, e, i, s, r, n, a, o, l, h, _, u, f, c, p, d;
  _gsScope._gsDefine(
    'TweenMax',
    ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
    function(t, e, i) {
      var s = function(t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        r = function(t, e, i) {
          var s,
            r,
            n = t.cycle;
          for (s in n)
            (r = n[s]),
              (t[s] = 'function' == typeof r ? r(i, e[i]) : r[i % r.length]);
          delete t.cycle;
        },
        n = function(t, e, s) {
          i.call(this, t, e, s),
            (this._cycle = 0),
            (this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._repeat && this._uncache(!0),
            (this.render = n.prototype.render);
        },
        a = 1e-10,
        o = i._internals,
        l = o.isSelector,
        h = o.isArray,
        _ = (n.prototype = i.to({}, 0.1, {})),
        u = [];
      (n.version = '1.20.3'),
        (_.constructor = n),
        (_.kill()._gc = !1),
        (n.killTweensOf = n.killDelayedCallsTo = i.killTweensOf),
        (n.getTweensOf = i.getTweensOf),
        (n.lagSmoothing = i.lagSmoothing),
        (n.ticker = i.ticker),
        (n.render = i.render),
        (_.invalidate = function() {
          return (
            (this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._yoyoEase = null),
            this._uncache(!0),
            i.prototype.invalidate.call(this)
          );
        }),
        (_.updateTo = function(t, e) {
          var s,
            r = this.ratio,
            n = this.vars.immediateRender || t.immediateRender;
          e &&
            this._startTime < this._timeline._time &&
            ((this._startTime = this._timeline._time),
            this._uncache(!1),
            this._gc
              ? this._enabled(!0, !1)
              : this._timeline.insert(this, this._startTime - this._delay));
          for (s in t) this.vars[s] = t[s];
          if (this._initted || n)
            if (e) (this._initted = !1), n && this.render(0, !0, !0);
            else if (
              (this._gc && this._enabled(!0, !1),
              this._notifyPluginsOfEnabled &&
                this._firstPT &&
                i._onPluginEvent('_onDisable', this),
              this._time / this._duration > 0.998)
            ) {
              var a = this._totalTime;
              this.render(0, !0, !1),
                (this._initted = !1),
                this.render(a, !0, !1);
            } else if (
              ((this._initted = !1), this._init(), this._time > 0 || n)
            )
              for (var o, l = 1 / (1 - r), h = this._firstPT; h; )
                (o = h.s + h.c), (h.c *= l), (h.s = o - h.c), (h = h._next);
          return this;
        }),
        (_.render = function(t, e, s) {
          this._initted ||
            (0 === this._duration && this.vars.repeat && this.invalidate());
          var r,
            n,
            l,
            h,
            _,
            u,
            f,
            c,
            p,
            d = this._dirty ? this.totalDuration() : this._totalDuration,
            m = this._time,
            g = this._totalTime,
            y = this._cycle,
            v = this._duration,
            T = this._rawPrevTime;
          if (
            (t >= d - 1e-7 && t >= 0
              ? ((this._totalTime = d),
                (this._cycle = this._repeat),
                this._yoyo && 0 != (1 & this._cycle)
                  ? ((this._time = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0))
                  : ((this._time = v),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(1)
                      : 1)),
                this._reversed ||
                  ((r = !0),
                  (n = 'onComplete'),
                  (s = s || this._timeline.autoRemoveChildren)),
                0 === v &&
                  (this._initted || !this.vars.lazy || s) &&
                  (this._startTime === this._timeline._duration && (t = 0),
                  (0 > T ||
                    (0 >= t && t >= -1e-7) ||
                    (T === a && 'isPause' !== this.data)) &&
                    T !== t &&
                    ((s = !0), T > a && (n = 'onReverseComplete')),
                  (this._rawPrevTime = c = !e || t || T === t ? t : a)))
              : 1e-7 > t
              ? ((this._totalTime = this._time = this._cycle = 0),
                (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                (0 !== g || (0 === v && T > 0)) &&
                  ((n = 'onReverseComplete'), (r = this._reversed)),
                0 > t &&
                  ((this._active = !1),
                  0 === v &&
                    (this._initted || !this.vars.lazy || s) &&
                    (T >= 0 && (s = !0),
                    (this._rawPrevTime = c = !e || t || T === t ? t : a))),
                this._initted || (s = !0))
              : ((this._totalTime = this._time = t),
                0 !== this._repeat &&
                  ((h = v + this._repeatDelay),
                  (this._cycle = (this._totalTime / h) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / h &&
                    t >= g &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * h),
                  this._yoyo &&
                    0 != (1 & this._cycle) &&
                    ((this._time = v - this._time),
                    (p = this._yoyoEase || this.vars.yoyoEase) &&
                      (this._yoyoEase ||
                        (!0 !== p || this._initted
                          ? (this._yoyoEase = p =
                              !0 === p
                                ? this._ease
                                : p instanceof Ease
                                ? p
                                : Ease.map[p])
                          : ((p = this.vars.ease),
                            (this._yoyoEase = p = p
                              ? p instanceof Ease
                                ? p
                                : 'function' == typeof p
                                ? new Ease(p, this.vars.easeParams)
                                : Ease.map[p] || i.defaultEase
                              : i.defaultEase))),
                      (this.ratio = p
                        ? 1 - p.getRatio((v - this._time) / v)
                        : 0))),
                  this._time > v
                    ? (this._time = v)
                    : this._time < 0 && (this._time = 0)),
                this._easeType && !p
                  ? ((_ = this._time / v),
                    (u = this._easeType),
                    (f = this._easePower),
                    (1 === u || (3 === u && _ >= 0.5)) && (_ = 1 - _),
                    3 === u && (_ *= 2),
                    1 === f
                      ? (_ *= _)
                      : 2 === f
                      ? (_ *= _ * _)
                      : 3 === f
                      ? (_ *= _ * _ * _)
                      : 4 === f && (_ *= _ * _ * _ * _),
                    1 === u
                      ? (this.ratio = 1 - _)
                      : 2 === u
                      ? (this.ratio = _)
                      : this._time / v < 0.5
                      ? (this.ratio = _ / 2)
                      : (this.ratio = 1 - _ / 2))
                  : p || (this.ratio = this._ease.getRatio(this._time / v))),
            m !== this._time || s || y !== this._cycle)
          ) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !s &&
                this._firstPT &&
                ((!1 !== this.vars.lazy && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = m),
                  (this._totalTime = g),
                  (this._rawPrevTime = T),
                  (this._cycle = y),
                  o.lazyTweens.push(this),
                  void (this._lazy = [t, e])
                );
              !this._time || r || p
                ? r &&
                  this._ease._calcEnd &&
                  !p &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                : (this.ratio = this._ease.getRatio(this._time / v));
            }
            for (
              !1 !== this._lazy && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== m &&
                    t >= 0 &&
                    (this._active = !0)),
                0 === g &&
                  (2 === this._initted && t > 0 && this._init(),
                  this._startAt &&
                    (t >= 0
                      ? this._startAt.render(t, !0, s)
                      : n || (n = '_dummyGS')),
                  this.vars.onStart &&
                    (0 !== this._totalTime || 0 === v) &&
                    (e || this._callback('onStart'))),
                l = this._firstPT;
              l;

            )
              l.f
                ? l.t[l.p](l.c * this.ratio + l.s)
                : (l.t[l.p] = l.c * this.ratio + l.s),
                (l = l._next);
            this._onUpdate &&
              (0 > t &&
                this._startAt &&
                this._startTime &&
                this._startAt.render(t, !0, s),
              e ||
                ((this._totalTime !== g || n) && this._callback('onUpdate'))),
              this._cycle !== y &&
                (e ||
                  this._gc ||
                  (this.vars.onRepeat && this._callback('onRepeat'))),
              n &&
                (!this._gc || s) &&
                (0 > t &&
                  this._startAt &&
                  !this._onUpdate &&
                  this._startTime &&
                  this._startAt.render(t, !0, s),
                r &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !e && this.vars[n] && this._callback(n),
                0 === v &&
                  this._rawPrevTime === a &&
                  c !== a &&
                  (this._rawPrevTime = 0));
          } else
            g !== this._totalTime &&
              this._onUpdate &&
              (e || this._callback('onUpdate'));
        }),
        (n.to = function(t, e, i) {
          return new n(t, e, i);
        }),
        (n.from = function(t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new n(t, e, i)
          );
        }),
        (n.fromTo = function(t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new n(t, e, s)
          );
        }),
        (n.staggerTo = n.allTo = function(t, e, a, o, _, f, c) {
          o = o || 0;
          var p,
            d,
            m,
            g,
            y = 0,
            v = [],
            T = function() {
              a.onComplete &&
                a.onComplete.apply(a.onCompleteScope || this, arguments),
                _.apply(c || a.callbackScope || this, f || u);
            },
            x = a.cycle,
            b = a.startAt && a.startAt.cycle;
          for (
            h(t) ||
              ('string' == typeof t && (t = i.selector(t) || t),
              l(t) && (t = s(t))),
              t = t || [],
              0 > o && ((t = s(t)).reverse(), (o *= -1)),
              p = t.length - 1,
              m = 0;
            p >= m;
            m++
          ) {
            d = {};
            for (g in a) d[g] = a[g];
            if (
              (x &&
                (r(d, t, m),
                null != d.duration && ((e = d.duration), delete d.duration)),
              b)
            ) {
              b = d.startAt = {};
              for (g in a.startAt) b[g] = a.startAt[g];
              r(d.startAt, t, m);
            }
            (d.delay = y + (d.delay || 0)),
              m === p && _ && (d.onComplete = T),
              (v[m] = new n(t[m], e, d)),
              (y += o);
          }
          return v;
        }),
        (n.staggerFrom = n.allFrom = function(t, e, i, s, r, a, o) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            n.staggerTo(t, e, i, s, r, a, o)
          );
        }),
        (n.staggerFromTo = n.allFromTo = function(t, e, i, s, r, a, o, l) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            n.staggerTo(t, e, s, r, a, o, l)
          );
        }),
        (n.delayedCall = function(t, e, i, s, r) {
          return new n(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            useFrames: r,
            overwrite: 0
          });
        }),
        (n.set = function(t, e) {
          return new n(t, 0, e);
        }),
        (n.isTweening = function(t) {
          return i.getTweensOf(t, !0).length > 0;
        });
      var f = function(t, e) {
          for (var s = [], r = 0, n = t._first; n; )
            n instanceof i
              ? (s[r++] = n)
              : (e && (s[r++] = n), (s = s.concat(f(n, e))), (r = s.length)),
              (n = n._next);
          return s;
        },
        c = (n.getAllTweens = function(e) {
          return f(t._rootTimeline, e).concat(f(t._rootFramesTimeline, e));
        });
      (n.killAll = function(t, i, s, r) {
        null == i && (i = !0), null == s && (s = !0);
        var n,
          a,
          o,
          l = c(0 != r),
          h = l.length,
          _ = i && s && r;
        for (o = 0; h > o; o++)
          (a = l[o]),
            (_ ||
              a instanceof e ||
              ((n = a.target === a.vars.onComplete) && s) ||
              (i && !n)) &&
              (t
                ? a.totalTime(a._reversed ? 0 : a.totalDuration())
                : a._enabled(!1, !1));
      }),
        (n.killChildTweensOf = function(t, e) {
          if (null != t) {
            var r,
              a,
              _,
              u,
              f,
              c = o.tweenLookup;
            if (
              ('string' == typeof t && (t = i.selector(t) || t),
              l(t) && (t = s(t)),
              h(t))
            )
              for (u = t.length; --u > -1; ) n.killChildTweensOf(t[u], e);
            else {
              r = [];
              for (_ in c)
                for (a = c[_].target.parentNode; a; )
                  a === t && (r = r.concat(c[_].tweens)), (a = a.parentNode);
              for (f = r.length, u = 0; f > u; u++)
                e && r[u].totalTime(r[u].totalDuration()),
                  r[u]._enabled(!1, !1);
            }
          }
        });
      var p = function(t, i, s, r) {
        (i = !1 !== i), (s = !1 !== s);
        for (
          var n, a, o = c((r = !1 !== r)), l = i && s && r, h = o.length;
          --h > -1;

        )
          (a = o[h]),
            (l ||
              a instanceof e ||
              ((n = a.target === a.vars.onComplete) && s) ||
              (i && !n)) &&
              a.paused(t);
      };
      return (
        (n.pauseAll = function(t, e, i) {
          p(!0, t, e, i);
        }),
        (n.resumeAll = function(t, e, i) {
          p(!1, t, e, i);
        }),
        (n.globalTimeScale = function(e) {
          var s = t._rootTimeline,
            r = i.ticker.time;
          return arguments.length
            ? ((e = e || a),
              (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
              (s = t._rootFramesTimeline),
              (r = i.ticker.frame),
              (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
              (s._timeScale = t._rootTimeline._timeScale = e),
              e)
            : s._timeScale;
        }),
        (_.progress = function(t, e) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) +
                  this._cycle * (this._duration + this._repeatDelay),
                e
              )
            : this._time / this.duration();
        }),
        (_.totalProgress = function(t, e) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, e)
            : this._totalTime / this.totalDuration();
        }),
        (_.time = function(t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              t > this._duration && (t = this._duration),
              this._yoyo && 0 != (1 & this._cycle)
                ? (t =
                    this._duration -
                    t +
                    this._cycle * (this._duration + this._repeatDelay))
                : 0 !== this._repeat &&
                  (t += this._cycle * (this._duration + this._repeatDelay)),
              this.totalTime(t, e))
            : this._time;
        }),
        (_.duration = function(e) {
          return arguments.length
            ? t.prototype.duration.call(this, e)
            : this._duration;
        }),
        (_.totalDuration = function(t) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (t - this._repeat * this._repeatDelay) / (this._repeat + 1)
                )
            : (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (_.repeat = function(t) {
          return arguments.length
            ? ((this._repeat = t), this._uncache(!0))
            : this._repeat;
        }),
        (_.repeatDelay = function(t) {
          return arguments.length
            ? ((this._repeatDelay = t), this._uncache(!0))
            : this._repeatDelay;
        }),
        (_.yoyo = function(t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        n
      );
    },
    !0
  ),
    _gsScope._gsDefine(
      'TimelineLite',
      ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
      function(t, e, i) {
        var s = function(t) {
            e.call(this, t),
              (this._labels = {}),
              (this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren),
              (this.smoothChildTiming = !0 === this.vars.smoothChildTiming),
              (this._sortChildren = !0),
              (this._onUpdate = this.vars.onUpdate);
            var i,
              s,
              r = this.vars;
            for (s in r)
              (i = r[s]),
                l(i) &&
                  -1 !== i.join('').indexOf('{self}') &&
                  (r[s] = this._swapSelfInParams(i));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
          },
          r = 1e-10,
          n = i._internals,
          a = (s._internals = {}),
          o = n.isSelector,
          l = n.isArray,
          h = n.lazyTweens,
          _ = n.lazyRender,
          u = _gsScope._gsDefine.globals,
          f = function(t) {
            var e,
              i = {};
            for (e in t) i[e] = t[e];
            return i;
          },
          c = function(t, e, i) {
            var s,
              r,
              n = t.cycle;
            for (s in n)
              (r = n[s]),
                (t[s] = 'function' == typeof r ? r(i, e[i]) : r[i % r.length]);
            delete t.cycle;
          },
          p = (a.pauseCallback = function() {}),
          d = function(t) {
            var e,
              i = [],
              s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i;
          },
          m = (s.prototype = new e());
        return (
          (s.version = '1.20.3'),
          (m.constructor = s),
          (m.kill()._gc = m._forcingPlayhead = m._hasPause = !1),
          (m.to = function(t, e, s, r) {
            var n = (s.repeat && u.TweenMax) || i;
            return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
          }),
          (m.from = function(t, e, s, r) {
            return this.add(((s.repeat && u.TweenMax) || i).from(t, e, s), r);
          }),
          (m.fromTo = function(t, e, s, r, n) {
            var a = (r.repeat && u.TweenMax) || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n);
          }),
          (m.staggerTo = function(t, e, r, n, a, l, h, _) {
            var u,
              p,
              m = new s({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: _,
                smoothChildTiming: this.smoothChildTiming
              }),
              g = r.cycle;
            for (
              'string' == typeof t && (t = i.selector(t) || t),
                o((t = t || [])) && (t = d(t)),
                0 > (n = n || 0) && ((t = d(t)).reverse(), (n *= -1)),
                p = 0;
              p < t.length;
              p++
            )
              (u = f(r)),
                u.startAt &&
                  ((u.startAt = f(u.startAt)),
                  u.startAt.cycle && c(u.startAt, t, p)),
                g &&
                  (c(u, t, p),
                  null != u.duration && ((e = u.duration), delete u.duration)),
                m.to(t[p], e, u, p * n);
            return this.add(m, a);
          }),
          (m.staggerFrom = function(t, e, i, s, r, n, a, o) {
            return (
              (i.immediateRender = 0 != i.immediateRender),
              (i.runBackwards = !0),
              this.staggerTo(t, e, i, s, r, n, a, o)
            );
          }),
          (m.staggerFromTo = function(t, e, i, s, r, n, a, o, l) {
            return (
              (s.startAt = i),
              (s.immediateRender =
                0 != s.immediateRender && 0 != i.immediateRender),
              this.staggerTo(t, e, s, r, n, a, o, l)
            );
          }),
          (m.call = function(t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r);
          }),
          (m.set = function(t, e, s) {
            return (
              (s = this._parseTimeOrLabel(s, 0, !0)),
              null == e.immediateRender &&
                (e.immediateRender = s === this._time && !this._paused),
              this.add(new i(t, 0, e), s)
            );
          }),
          (s.exportRoot = function(t, e) {
            null == (t = t || {}).smoothChildTiming &&
              (t.smoothChildTiming = !0);
            var r,
              n,
              a,
              o,
              l = new s(t),
              h = l._timeline;
            for (
              null == e && (e = !0),
                h._remove(l, !0),
                l._startTime = 0,
                l._rawPrevTime = l._time = l._totalTime = h._time,
                a = h._first;
              a;

            )
              (o = a._next),
                (e && a instanceof i && a.target === a.vars.onComplete) ||
                  ((n = a._startTime - a._delay),
                  0 > n && (r = 1),
                  l.add(a, n)),
                (a = o);
            return h.add(l, 0), r && l.totalDuration(), l;
          }),
          (m.add = function(r, n, a, o) {
            var h, _, u, f, c, p;
            if (
              ('number' != typeof n &&
                (n = this._parseTimeOrLabel(n, 0, !0, r)),
              !(r instanceof t))
            ) {
              if (r instanceof Array || (r && r.push && l(r))) {
                for (
                  a = a || 'normal', o = o || 0, h = n, _ = r.length, u = 0;
                  _ > u;
                  u++
                )
                  l((f = r[u])) && (f = new s({ tweens: f })),
                    this.add(f, h),
                    'string' != typeof f &&
                      'function' != typeof f &&
                      ('sequence' === a
                        ? (h = f._startTime + f.totalDuration() / f._timeScale)
                        : 'start' === a && (f._startTime -= f.delay())),
                    (h += o);
                return this._uncache(!0);
              }
              if ('string' == typeof r) return this.addLabel(r, n);
              if ('function' != typeof r)
                throw 'Cannot add ' +
                  r +
                  ' into the timeline; it is not a tween, timeline, function, or string.';
              r = i.delayedCall(0, r);
            }
            if (
              (e.prototype.add.call(this, r, n),
              r._time &&
                r.render(
                  (this.rawTime() - r._startTime) * r._timeScale,
                  !1,
                  !1
                ),
              (this._gc || this._time === this._duration) &&
                !this._paused &&
                this._duration < this.duration())
            )
              for (c = this, p = c.rawTime() > r._startTime; c._timeline; )
                p && c._timeline.smoothChildTiming
                  ? c.totalTime(c._totalTime, !0)
                  : c._gc && c._enabled(!0, !1),
                  (c = c._timeline);
            return this;
          }),
          (m.remove = function(e) {
            if (e instanceof t) {
              this._remove(e, !1);
              var i = (e._timeline = e.vars.useFrames
                ? t._rootFramesTimeline
                : t._rootTimeline);
              return (
                (e._startTime =
                  (e._paused ? e._pauseTime : i._time) -
                  (e._reversed
                    ? e.totalDuration() - e._totalTime
                    : e._totalTime) /
                    e._timeScale),
                this
              );
            }
            if (e instanceof Array || (e && e.push && l(e))) {
              for (var s = e.length; --s > -1; ) this.remove(e[s]);
              return this;
            }
            return 'string' == typeof e
              ? this.removeLabel(e)
              : this.kill(null, e);
          }),
          (m._remove = function(t, i) {
            return (
              e.prototype._remove.call(this, t, i),
              this._last
                ? this._time > this.duration() &&
                  ((this._time = this._duration),
                  (this._totalTime = this._totalDuration))
                : (this._time = this._totalTime = this._duration = this._totalDuration = 0),
              this
            );
          }),
          (m.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
          }),
          (m.insert = m.insertMultiple = function(t, e, i, s) {
            return this.add(t, e || 0, i, s);
          }),
          (m.appendMultiple = function(t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
          }),
          (m.addLabel = function(t, e) {
            return (this._labels[t] = this._parseTimeOrLabel(e)), this;
          }),
          (m.addPause = function(t, e, s, r) {
            var n = i.delayedCall(0, p, s, r || this);
            return (
              (n.vars.onComplete = n.vars.onReverseComplete = e),
              (n.data = 'isPause'),
              (this._hasPause = !0),
              this.add(n, t)
            );
          }),
          (m.removeLabel = function(t) {
            return delete this._labels[t], this;
          }),
          (m.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1;
          }),
          (m._parseTimeOrLabel = function(e, i, s, r) {
            var n, a;
            if (r instanceof t && r.timeline === this) this.remove(r);
            else if (r && (r instanceof Array || (r.push && l(r))))
              for (a = r.length; --a > -1; )
                r[a] instanceof t &&
                  r[a].timeline === this &&
                  this.remove(r[a]);
            if (
              ((n =
                'number' != typeof e || i
                  ? this.duration() > 99999999999
                    ? this.recent().endTime(!1)
                    : this._duration
                  : 0),
              'string' == typeof i)
            )
              return this._parseTimeOrLabel(
                i,
                s && 'number' == typeof e && null == this._labels[i]
                  ? e - n
                  : 0,
                s
              );
            if (
              ((i = i || 0),
              'string' != typeof e || (!isNaN(e) && null == this._labels[e]))
            )
              null == e && (e = n);
            else {
              if (-1 === (a = e.indexOf('=')))
                return null == this._labels[e]
                  ? s
                    ? (this._labels[e] = n + i)
                    : i
                  : this._labels[e] + i;
              (i =
                parseInt(e.charAt(a - 1) + '1', 10) * Number(e.substr(a + 1))),
                (e =
                  a > 1 ? this._parseTimeOrLabel(e.substr(0, a - 1), 0, s) : n);
            }
            return Number(e) + i;
          }),
          (m.seek = function(t, e) {
            return this.totalTime(
              'number' == typeof t ? t : this._parseTimeOrLabel(t),
              !1 !== e
            );
          }),
          (m.stop = function() {
            return this.paused(!0);
          }),
          (m.gotoAndPlay = function(t, e) {
            return this.play(t, e);
          }),
          (m.gotoAndStop = function(t, e) {
            return this.pause(t, e);
          }),
          (m.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s,
              n,
              a,
              o,
              l,
              u,
              f,
              c = this._time,
              p = this._dirty ? this.totalDuration() : this._totalDuration,
              d = this._startTime,
              m = this._timeScale,
              g = this._paused;
            if (
              (c !== this._time && (t += this._time - c),
              t >= p - 1e-7 && t >= 0)
            )
              (this._totalTime = this._time = p),
                this._reversed ||
                  this._hasPausedChild() ||
                  ((n = !0),
                  (o = 'onComplete'),
                  (l = !!this._timeline.autoRemoveChildren),
                  0 === this._duration &&
                    ((0 >= t && t >= -1e-7) ||
                      this._rawPrevTime < 0 ||
                      this._rawPrevTime === r) &&
                    this._rawPrevTime !== t &&
                    this._first &&
                    ((l = !0),
                    this._rawPrevTime > r && (o = 'onReverseComplete'))),
                (this._rawPrevTime =
                  this._duration || !e || t || this._rawPrevTime === t ? t : r),
                (t = p + 1e-4);
            else if (1e-7 > t)
              if (
                ((this._totalTime = this._time = 0),
                (0 !== c ||
                  (0 === this._duration &&
                    this._rawPrevTime !== r &&
                    (this._rawPrevTime > 0 ||
                      (0 > t && this._rawPrevTime >= 0)))) &&
                  ((o = 'onReverseComplete'), (n = this._reversed)),
                0 > t)
              )
                (this._active = !1),
                  this._timeline.autoRemoveChildren && this._reversed
                    ? ((l = n = !0), (o = 'onReverseComplete'))
                    : this._rawPrevTime >= 0 && this._first && (l = !0),
                  (this._rawPrevTime = t);
              else {
                if (
                  ((this._rawPrevTime =
                    this._duration || !e || t || this._rawPrevTime === t
                      ? t
                      : r),
                  0 === t && n)
                )
                  for (s = this._first; s && 0 === s._startTime; )
                    s._duration || (n = !1), (s = s._next);
                (t = 0), this._initted || (l = !0);
              }
            else {
              if (this._hasPause && !this._forcingPlayhead && !e) {
                if (t >= c)
                  for (s = this._first; s && s._startTime <= t && !u; )
                    s._duration ||
                      'isPause' !== s.data ||
                      s.ratio ||
                      (0 === s._startTime && 0 === this._rawPrevTime) ||
                      (u = s),
                      (s = s._next);
                else
                  for (s = this._last; s && s._startTime >= t && !u; )
                    s._duration ||
                      ('isPause' === s.data && s._rawPrevTime > 0 && (u = s)),
                      (s = s._prev);
                u &&
                  ((this._time = t = u._startTime),
                  (this._totalTime =
                    t +
                    this._cycle * (this._totalDuration + this._repeatDelay)));
              }
              this._totalTime = this._time = this._rawPrevTime = t;
            }
            if ((this._time !== c && this._first) || i || l || u) {
              if (
                (this._initted || (this._initted = !0),
                this._active ||
                  (!this._paused &&
                    this._time !== c &&
                    t > 0 &&
                    (this._active = !0)),
                0 === c &&
                  this.vars.onStart &&
                  ((0 === this._time && this._duration) ||
                    e ||
                    this._callback('onStart')),
                (f = this._time) >= c)
              )
                for (
                  s = this._first;
                  s &&
                  ((a = s._next), f === this._time && (!this._paused || g));

                )
                  (s._active || (s._startTime <= f && !s._paused && !s._gc)) &&
                    (u === s && this.pause(),
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i)),
                    (s = a);
              else
                for (
                  s = this._last;
                  s &&
                  ((a = s._prev), f === this._time && (!this._paused || g));

                ) {
                  if (
                    s._active ||
                    (s._startTime <= c && !s._paused && !s._gc)
                  ) {
                    if (u === s) {
                      for (u = s._prev; u && u.endTime() > this._time; )
                        u.render(
                          u._reversed
                            ? u.totalDuration() -
                                (t - u._startTime) * u._timeScale
                            : (t - u._startTime) * u._timeScale,
                          e,
                          i
                        ),
                          (u = u._prev);
                      (u = null), this.pause();
                    }
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i);
                  }
                  s = a;
                }
              this._onUpdate &&
                (e || (h.length && _(), this._callback('onUpdate'))),
                o &&
                  (this._gc ||
                    ((d === this._startTime || m !== this._timeScale) &&
                      (0 === this._time || p >= this.totalDuration()) &&
                      (n &&
                        (h.length && _(),
                        this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !e && this.vars[o] && this._callback(o))));
            }
          }),
          (m._hasPausedChild = function() {
            for (var t = this._first; t; ) {
              if (t._paused || (t instanceof s && t._hasPausedChild()))
                return !0;
              t = t._next;
            }
            return !1;
          }),
          (m.getChildren = function(t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a; )
              a._startTime < r ||
                (a instanceof i
                  ? !1 !== e && (n[o++] = a)
                  : (!1 !== s && (n[o++] = a),
                    !1 !== t &&
                      ((n = n.concat(a.getChildren(!0, e, s))),
                      (o = n.length)))),
                (a = a._next);
            return n;
          }),
          (m.getTweensOf = function(t, e) {
            var s,
              r,
              n = this._gc,
              a = [],
              o = 0;
            for (
              n && this._enabled(!0, !0), r = (s = i.getTweensOf(t)).length;
              --r > -1;

            )
              (s[r].timeline === this || (e && this._contains(s[r]))) &&
                (a[o++] = s[r]);
            return n && this._enabled(!1, !0), a;
          }),
          (m.recent = function() {
            return this._recent;
          }),
          (m._contains = function(t) {
            for (var e = t.timeline; e; ) {
              if (e === this) return !0;
              e = e.timeline;
            }
            return !1;
          }),
          (m.shiftChildren = function(t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r; )
              r._startTime >= i && (r._startTime += t), (r = r._next);
            if (e) for (s in n) n[s] >= i && (n[s] += t);
            return this._uncache(!0);
          }),
          (m._kill = function(t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (
              var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
                s = i.length,
                r = !1;
              --s > -1;

            )
              i[s]._kill(t, e) && (r = !0);
            return r;
          }),
          (m.clear = function(t) {
            var e = this.getChildren(!1, !0, !0),
              i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
              e[i]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}), this._uncache(!0);
          }),
          (m.invalidate = function() {
            for (var e = this._first; e; ) e.invalidate(), (e = e._next);
            return t.prototype.invalidate.call(this);
          }),
          (m._enabled = function(t, i) {
            if (t === this._gc)
              for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
            return e.prototype._enabled.call(this, t, i);
          }),
          (m.totalTime = function(e, i, s) {
            this._forcingPlayhead = !0;
            var r = t.prototype.totalTime.apply(this, arguments);
            return (this._forcingPlayhead = !1), r;
          }),
          (m.duration = function(t) {
            return arguments.length
              ? (0 !== this.duration() &&
                  0 !== t &&
                  this.timeScale(this._duration / t),
                this)
              : (this._dirty && this.totalDuration(), this._duration);
          }),
          (m.totalDuration = function(t) {
            if (!arguments.length) {
              if (this._dirty) {
                for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                  (e = r._prev),
                    r._dirty && r.totalDuration(),
                    r._startTime > n &&
                    this._sortChildren &&
                    !r._paused &&
                    !this._calculatingDuration
                      ? ((this._calculatingDuration = 1),
                        this.add(r, r._startTime - r._delay),
                        (this._calculatingDuration = 0))
                      : (n = r._startTime),
                    r._startTime < 0 &&
                      !r._paused &&
                      ((s -= r._startTime),
                      this._timeline.smoothChildTiming &&
                        ((this._startTime += r._startTime / this._timeScale),
                        (this._time -= r._startTime),
                        (this._totalTime -= r._startTime),
                        (this._rawPrevTime -= r._startTime)),
                      this.shiftChildren(-r._startTime, !1, -9999999999),
                      (n = 0)),
                    (i = r._startTime + r._totalDuration / r._timeScale),
                    i > s && (s = i),
                    (r = e);
                (this._duration = this._totalDuration = s), (this._dirty = !1);
              }
              return this._totalDuration;
            }
            return t && this.totalDuration()
              ? this.timeScale(this._totalDuration / t)
              : this;
          }),
          (m.paused = function(e) {
            if (!e)
              for (var i = this._first, s = this._time; i; )
                i._startTime === s &&
                  'isPause' === i.data &&
                  (i._rawPrevTime = 0),
                  (i = i._next);
            return t.prototype.paused.apply(this, arguments);
          }),
          (m.usesFrames = function() {
            for (var e = this._timeline; e._timeline; ) e = e._timeline;
            return e === t._rootFramesTimeline;
          }),
          (m.rawTime = function(t) {
            return t &&
              (this._paused ||
                (this._repeat && this.time() > 0 && this.totalProgress() < 1))
              ? this._totalTime % (this._duration + this._repeatDelay)
              : this._paused
              ? this._totalTime
              : (this._timeline.rawTime(t) - this._startTime) * this._timeScale;
          }),
          s
        );
      },
      !0
    ),
    _gsScope._gsDefine(
      'TimelineMax',
      ['TimelineLite', 'TweenLite', 'easing.Ease'],
      function(t, e, i) {
        var s = function(e) {
            t.call(this, e),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._cycle = 0),
              (this._yoyo = !0 === this.vars.yoyo),
              (this._dirty = !0);
          },
          r = 1e-10,
          n = e._internals,
          a = n.lazyTweens,
          o = n.lazyRender,
          l = _gsScope._gsDefine.globals,
          h = new i(null, null, 1, 0),
          _ = (s.prototype = new t());
        return (
          (_.constructor = s),
          (_.kill()._gc = !1),
          (s.version = '1.20.3'),
          (_.invalidate = function() {
            return (
              (this._yoyo = !0 === this.vars.yoyo),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._uncache(!0),
              t.prototype.invalidate.call(this)
            );
          }),
          (_.addCallback = function(t, i, s, r) {
            return this.add(e.delayedCall(0, t, s, r), i);
          }),
          (_.removeCallback = function(t, e) {
            if (t)
              if (null == e) this._kill(null, t);
              else
                for (
                  var i = this.getTweensOf(t, !1),
                    s = i.length,
                    r = this._parseTimeOrLabel(e);
                  --s > -1;

                )
                  i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this;
          }),
          (_.removePause = function(e) {
            return this.removeCallback(t._internals.pauseCallback, e);
          }),
          (_.tweenTo = function(t, i) {
            i = i || {};
            var s,
              r,
              n,
              a = {
                ease: h,
                useFrames: this.usesFrames(),
                immediateRender: !1
              },
              o = (i.repeat && l.TweenMax) || e;
            for (r in i) a[r] = i[r];
            return (
              (a.time = this._parseTimeOrLabel(t)),
              (s =
                Math.abs(Number(a.time) - this._time) / this._timeScale ||
                0.001),
              (n = new o(this, s, a)),
              (a.onStart = function() {
                n.target.paused(!0),
                  n.vars.time !== n.target.time() &&
                    s === n.duration() &&
                    n.duration(
                      Math.abs(n.vars.time - n.target.time()) /
                        n.target._timeScale
                    ),
                  i.onStart &&
                    i.onStart.apply(
                      i.onStartScope || i.callbackScope || n,
                      i.onStartParams || []
                    );
              }),
              n
            );
          }),
          (_.tweenFromTo = function(t, e, i) {
            (i = i || {}),
              (t = this._parseTimeOrLabel(t)),
              (i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                callbackScope: this
              }),
              (i.immediateRender = !1 !== i.immediateRender);
            var s = this.tweenTo(e, i);
            return s.duration(
              Math.abs(s.vars.time - t) / this._timeScale || 0.001
            );
          }),
          (_.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s,
              n,
              l,
              h,
              _,
              u,
              f,
              c,
              p = this._time,
              d = this._dirty ? this.totalDuration() : this._totalDuration,
              m = this._duration,
              g = this._totalTime,
              y = this._startTime,
              v = this._timeScale,
              T = this._rawPrevTime,
              x = this._paused,
              b = this._cycle;
            if (
              (p !== this._time && (t += this._time - p),
              t >= d - 1e-7 && t >= 0)
            )
              this._locked ||
                ((this._totalTime = d), (this._cycle = this._repeat)),
                this._reversed ||
                  this._hasPausedChild() ||
                  ((n = !0),
                  (h = 'onComplete'),
                  (_ = !!this._timeline.autoRemoveChildren),
                  0 === this._duration &&
                    ((0 >= t && t >= -1e-7) || 0 > T || T === r) &&
                    T !== t &&
                    this._first &&
                    ((_ = !0), T > r && (h = 'onReverseComplete'))),
                (this._rawPrevTime =
                  this._duration || !e || t || this._rawPrevTime === t ? t : r),
                this._yoyo && 0 != (1 & this._cycle)
                  ? (this._time = t = 0)
                  : ((this._time = m), (t = m + 1e-4));
            else if (1e-7 > t)
              if (
                (this._locked || (this._totalTime = this._cycle = 0),
                (this._time = 0),
                (0 !== p ||
                  (0 === m &&
                    T !== r &&
                    (T > 0 || (0 > t && T >= 0)) &&
                    !this._locked)) &&
                  ((h = 'onReverseComplete'), (n = this._reversed)),
                0 > t)
              )
                (this._active = !1),
                  this._timeline.autoRemoveChildren && this._reversed
                    ? ((_ = n = !0), (h = 'onReverseComplete'))
                    : T >= 0 && this._first && (_ = !0),
                  (this._rawPrevTime = t);
              else {
                if (
                  ((this._rawPrevTime =
                    m || !e || t || this._rawPrevTime === t ? t : r),
                  0 === t && n)
                )
                  for (s = this._first; s && 0 === s._startTime; )
                    s._duration || (n = !1), (s = s._next);
                (t = 0), this._initted || (_ = !0);
              }
            else if (
              (0 === m && 0 > T && (_ = !0),
              (this._time = this._rawPrevTime = t),
              this._locked ||
                ((this._totalTime = t),
                0 !== this._repeat &&
                  ((u = m + this._repeatDelay),
                  (this._cycle = (this._totalTime / u) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / u &&
                    t >= g &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * u),
                  this._yoyo &&
                    0 != (1 & this._cycle) &&
                    (this._time = m - this._time),
                  this._time > m
                    ? ((this._time = m), (t = m + 1e-4))
                    : this._time < 0
                    ? (this._time = t = 0)
                    : (t = this._time))),
              this._hasPause && !this._forcingPlayhead && !e)
            ) {
              if ((t = this._time) >= p || (this._repeat && b !== this._cycle))
                for (s = this._first; s && s._startTime <= t && !f; )
                  s._duration ||
                    'isPause' !== s.data ||
                    s.ratio ||
                    (0 === s._startTime && 0 === this._rawPrevTime) ||
                    (f = s),
                    (s = s._next);
              else
                for (s = this._last; s && s._startTime >= t && !f; )
                  s._duration ||
                    ('isPause' === s.data && s._rawPrevTime > 0 && (f = s)),
                    (s = s._prev);
              f &&
                f._startTime < m &&
                ((this._time = t = f._startTime),
                (this._totalTime =
                  t + this._cycle * (this._totalDuration + this._repeatDelay)));
            }
            if (this._cycle !== b && !this._locked) {
              var w = this._yoyo && 0 != (1 & b),
                P = w === (this._yoyo && 0 != (1 & this._cycle)),
                O = this._totalTime,
                S = this._cycle,
                k = this._rawPrevTime,
                R = this._time;
              if (
                ((this._totalTime = b * m),
                this._cycle < b ? (w = !w) : (this._totalTime += m),
                (this._time = p),
                (this._rawPrevTime = 0 === m ? T - 1e-4 : T),
                (this._cycle = b),
                (this._locked = !0),
                (p = w ? 0 : m),
                this.render(p, e, 0 === m),
                e ||
                  this._gc ||
                  (this.vars.onRepeat &&
                    ((this._cycle = S),
                    (this._locked = !1),
                    this._callback('onRepeat'))),
                p !== this._time)
              )
                return;
              if (
                (P &&
                  ((this._cycle = b),
                  (this._locked = !0),
                  (p = w ? m + 1e-4 : -1e-4),
                  this.render(p, !0, !1)),
                (this._locked = !1),
                this._paused && !x)
              )
                return;
              (this._time = R),
                (this._totalTime = O),
                (this._cycle = S),
                (this._rawPrevTime = k);
            }
            if ((this._time !== p && this._first) || i || _ || f) {
              if (
                (this._initted || (this._initted = !0),
                this._active ||
                  (!this._paused &&
                    this._totalTime !== g &&
                    t > 0 &&
                    (this._active = !0)),
                0 === g &&
                  this.vars.onStart &&
                  ((0 === this._totalTime && this._totalDuration) ||
                    e ||
                    this._callback('onStart')),
                (c = this._time) >= p)
              )
                for (
                  s = this._first;
                  s &&
                  ((l = s._next), c === this._time && (!this._paused || x));

                )
                  (s._active ||
                    (s._startTime <= this._time && !s._paused && !s._gc)) &&
                    (f === s && this.pause(),
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i)),
                    (s = l);
              else
                for (
                  s = this._last;
                  s &&
                  ((l = s._prev), c === this._time && (!this._paused || x));

                ) {
                  if (
                    s._active ||
                    (s._startTime <= p && !s._paused && !s._gc)
                  ) {
                    if (f === s) {
                      for (f = s._prev; f && f.endTime() > this._time; )
                        f.render(
                          f._reversed
                            ? f.totalDuration() -
                                (t - f._startTime) * f._timeScale
                            : (t - f._startTime) * f._timeScale,
                          e,
                          i
                        ),
                          (f = f._prev);
                      (f = null), this.pause();
                    }
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i);
                  }
                  s = l;
                }
              this._onUpdate &&
                (e || (a.length && o(), this._callback('onUpdate'))),
                h &&
                  (this._locked ||
                    this._gc ||
                    ((y === this._startTime || v !== this._timeScale) &&
                      (0 === this._time || d >= this.totalDuration()) &&
                      (n &&
                        (a.length && o(),
                        this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !e && this.vars[h] && this._callback(h))));
            } else
              g !== this._totalTime &&
                this._onUpdate &&
                (e || this._callback('onUpdate'));
          }),
          (_.getActive = function(t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var s,
              r,
              n = [],
              a = this.getChildren(t, e, i),
              o = 0,
              l = a.length;
            for (s = 0; l > s; s++) (r = a[s]), r.isActive() && (n[o++] = r);
            return n;
          }),
          (_.getLabelAfter = function(t) {
            t || (0 !== t && (t = this._time));
            var e,
              i = this.getLabelsArray(),
              s = i.length;
            for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
            return null;
          }),
          (_.getLabelBefore = function(t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
              if (e[i].time < t) return e[i].name;
            return null;
          }),
          (_.getLabelsArray = function() {
            var t,
              e = [],
              i = 0;
            for (t in this._labels) e[i++] = { time: this._labels[t], name: t };
            return (
              e.sort(function(t, e) {
                return t.time - e.time;
              }),
              e
            );
          }),
          (_.invalidate = function() {
            return (this._locked = !1), t.prototype.invalidate.call(this);
          }),
          (_.progress = function(t, e) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) +
                    this._cycle * (this._duration + this._repeatDelay),
                  e
                )
              : this._time / this.duration() || 0;
          }),
          (_.totalProgress = function(t, e) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * t, e)
              : this._totalTime / this.totalDuration() || 0;
          }),
          (_.totalDuration = function(e) {
            return arguments.length
              ? -1 !== this._repeat && e
                ? this.timeScale(this.totalDuration() / e)
                : this
              : (this._dirty &&
                  (t.prototype.totalDuration.call(this),
                  (this._totalDuration =
                    -1 === this._repeat
                      ? 999999999999
                      : this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat)),
                this._totalDuration);
          }),
          (_.time = function(t, e) {
            return arguments.length
              ? (this._dirty && this.totalDuration(),
                t > this._duration && (t = this._duration),
                this._yoyo && 0 != (1 & this._cycle)
                  ? (t =
                      this._duration -
                      t +
                      this._cycle * (this._duration + this._repeatDelay))
                  : 0 !== this._repeat &&
                    (t += this._cycle * (this._duration + this._repeatDelay)),
                this.totalTime(t, e))
              : this._time;
          }),
          (_.repeat = function(t) {
            return arguments.length
              ? ((this._repeat = t), this._uncache(!0))
              : this._repeat;
          }),
          (_.repeatDelay = function(t) {
            return arguments.length
              ? ((this._repeatDelay = t), this._uncache(!0))
              : this._repeatDelay;
          }),
          (_.yoyo = function(t) {
            return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
          }),
          (_.currentLabel = function(t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.getLabelBefore(this._time + 1e-8);
          }),
          s
        );
      },
      !0
    ),
    (i = 180 / Math.PI),
    (s = []),
    (r = []),
    (n = []),
    (a = {}),
    (o = _gsScope._gsDefine.globals),
    (l = function(t, e, i, s) {
      i === s && (i = s - (s - e) / 1e6),
        t === e && (e = t + (i - t) / 1e6),
        (this.a = t),
        (this.b = e),
        (this.c = i),
        (this.d = s),
        (this.da = s - t),
        (this.ca = i - t),
        (this.ba = e - t);
    }),
    (h = function(t, e, i, s) {
      var r = { a: t },
        n = {},
        a = {},
        o = { c: s },
        l = (t + e) / 2,
        h = (e + i) / 2,
        _ = (i + s) / 2,
        u = (l + h) / 2,
        f = (h + _) / 2,
        c = (f - u) / 8;
      return (
        (r.b = l + (t - l) / 4),
        (n.b = u + c),
        (r.c = n.a = (r.b + n.b) / 2),
        (n.c = a.a = (u + f) / 2),
        (a.b = f - c),
        (o.b = _ + (s - _) / 4),
        (a.c = o.a = (a.b + o.b) / 2),
        [r, n, a, o]
      );
    }),
    (_ = function(t, e, i, a, o) {
      var l,
        _,
        u,
        f,
        c,
        p,
        d,
        m,
        g,
        y,
        v,
        T,
        x,
        b = t.length - 1,
        w = 0,
        P = t[0].a;
      for (l = 0; b > l; l++)
        (c = t[w]),
          (_ = c.a),
          (u = c.d),
          (f = t[w + 1].d),
          o
            ? ((v = s[l]),
              (T = r[l]),
              (x = ((T + v) * e * 0.25) / (a ? 0.5 : n[l] || 0.5)),
              (p = u - (u - _) * (a ? 0.5 * e : 0 !== v ? x / v : 0)),
              (d = u + (f - u) * (a ? 0.5 * e : 0 !== T ? x / T : 0)),
              (m = u - (p + (((d - p) * ((3 * v) / (v + T) + 0.5)) / 4 || 0))))
            : ((p = u - (u - _) * e * 0.5),
              (d = u + (f - u) * e * 0.5),
              (m = u - (p + d) / 2)),
          (p += m),
          (d += m),
          (c.c = g = p),
          (c.b = 0 !== l ? P : (P = c.a + 0.6 * (c.c - c.a))),
          (c.da = u - _),
          (c.ca = g - _),
          (c.ba = P - _),
          i
            ? ((y = h(_, P, g, u)),
              t.splice(w, 1, y[0], y[1], y[2], y[3]),
              (w += 4))
            : w++,
          (P = d);
      ((c = t[w]).b = P),
        (c.c = P + 0.4 * (c.d - P)),
        (c.da = c.d - c.a),
        (c.ca = c.c - c.a),
        (c.ba = P - c.a),
        i &&
          ((y = h(c.a, P, c.c, c.d)), t.splice(w, 1, y[0], y[1], y[2], y[3]));
    }),
    (u = function(t, e, i, n) {
      var a,
        o,
        h,
        _,
        u,
        f,
        c = [];
      if (n)
        for (t = [n].concat(t), o = t.length; --o > -1; )
          'string' == typeof (f = t[o][e]) &&
            '=' === f.charAt(1) &&
            (t[o][e] = n[e] + Number(f.charAt(0) + f.substr(2)));
      if (0 > (a = t.length - 2))
        return (c[0] = new l(t[0][e], 0, 0, t[0][e])), c;
      for (o = 0; a > o; o++)
        (h = t[o][e]),
          (_ = t[o + 1][e]),
          (c[o] = new l(h, 0, 0, _)),
          i &&
            ((u = t[o + 2][e]),
            (s[o] = (s[o] || 0) + (_ - h) * (_ - h)),
            (r[o] = (r[o] || 0) + (u - _) * (u - _)));
      return (c[o] = new l(t[o][e], 0, 0, t[o + 1][e])), c;
    }),
    (f = function(t, e, i, o, l, h) {
      var f,
        c,
        p,
        d,
        m,
        g,
        y,
        v,
        T = {},
        x = [],
        b = h || t[0];
      (l =
        'string' == typeof l
          ? ',' + l + ','
          : ',x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,'),
        null == e && (e = 1);
      for (c in t[0]) x.push(c);
      if (t.length > 1) {
        for (v = t[t.length - 1], y = !0, f = x.length; --f > -1; )
          if (((c = x[f]), Math.abs(b[c] - v[c]) > 0.05)) {
            y = !1;
            break;
          }
        y &&
          ((t = t.concat()),
          h && t.unshift(h),
          t.push(t[1]),
          (h = t[t.length - 3]));
      }
      for (s.length = r.length = n.length = 0, f = x.length; --f > -1; )
        (c = x[f]),
          (a[c] = -1 !== l.indexOf(',' + c + ',')),
          (T[c] = u(t, c, a[c], h));
      for (f = s.length; --f > -1; )
        (s[f] = Math.sqrt(s[f])), (r[f] = Math.sqrt(r[f]));
      if (!o) {
        for (f = x.length; --f > -1; )
          if (a[c])
            for (p = T[x[f]], g = p.length - 1, d = 0; g > d; d++)
              (m = p[d + 1].da / r[d] + p[d].da / s[d] || 0),
                (n[d] = (n[d] || 0) + m * m);
        for (f = n.length; --f > -1; ) n[f] = Math.sqrt(n[f]);
      }
      for (f = x.length, d = i ? 4 : 1; --f > -1; )
        (c = x[f]),
          (p = T[c]),
          _(p, e, i, o, a[c]),
          y && (p.splice(0, d), p.splice(p.length - d, d));
      return T;
    }),
    (c = function(t, e, i) {
      for (
        var s, r, n, a, o, l, h, _, u, f, c, p = 1 / i, d = t.length;
        --d > -1;

      )
        for (
          f = t[d],
            n = f.a,
            a = f.d - n,
            o = f.c - n,
            l = f.b - n,
            s = r = 0,
            _ = 1;
          i >= _;
          _++
        )
          (h = p * _),
            (u = 1 - h),
            (s = r - (r = (h * h * a + 3 * u * (h * o + u * l)) * h)),
            (c = d * i + _ - 1),
            (e[c] = (e[c] || 0) + s * s);
    }),
    (p = _gsScope._gsDefine.plugin({
      propName: 'bezier',
      priority: -1,
      version: '1.3.8',
      API: 2,
      global: !0,
      init: function(t, e, i) {
        (this._target = t),
          e instanceof Array && (e = { values: e }),
          (this._func = {}),
          (this._mod = {}),
          (this._props = []),
          (this._timeRes =
            null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10));
        var s,
          r,
          n,
          a,
          o,
          h = e.values || [],
          _ = {},
          u = h[0],
          p = e.autoRotate || i.vars.orientToBezier;
        this._autoRotate = p
          ? p instanceof Array
            ? p
            : [['x', 'y', 'rotation', !0 === p ? 0 : Number(p) || 0]]
          : null;
        for (s in u) this._props.push(s);
        for (n = this._props.length; --n > -1; )
          (s = this._props[n]),
            this._overwriteProps.push(s),
            (r = this._func[s] = 'function' == typeof t[s]),
            (_[s] = r
              ? t[
                  s.indexOf('set') ||
                  'function' != typeof t['get' + s.substr(3)]
                    ? s
                    : 'get' + s.substr(3)
                ]()
              : parseFloat(t[s])),
            o || (_[s] !== h[0][s] && (o = _));
        if (
          ((this._beziers =
            'cubic' !== e.type && 'quadratic' !== e.type && 'soft' !== e.type
              ? f(
                  h,
                  isNaN(e.curviness) ? 1 : e.curviness,
                  !1,
                  'thruBasic' === e.type,
                  e.correlate,
                  o
                )
              : (function(t, e, i) {
                  var s,
                    r,
                    n,
                    a,
                    o,
                    h,
                    _,
                    u,
                    f,
                    c,
                    p,
                    d = {},
                    m = 'cubic' === (e = e || 'soft') ? 3 : 2,
                    g = 'soft' === e,
                    y = [];
                  if (
                    (g && i && (t = [i].concat(t)),
                    null == t || t.length < m + 1)
                  )
                    throw 'invalid Bezier data';
                  for (f in t[0]) y.push(f);
                  for (h = y.length; --h > -1; ) {
                    for (
                      d[(f = y[h])] = o = [], c = 0, u = t.length, _ = 0;
                      u > _;
                      _++
                    )
                      (s =
                        null == i
                          ? t[_][f]
                          : 'string' == typeof (p = t[_][f]) &&
                            '=' === p.charAt(1)
                          ? i[f] + Number(p.charAt(0) + p.substr(2))
                          : Number(p)),
                        g &&
                          _ > 1 &&
                          u - 1 > _ &&
                          (o[c++] = (s + o[c - 2]) / 2),
                        (o[c++] = s);
                    for (u = c - m + 1, c = 0, _ = 0; u > _; _ += m)
                      (s = o[_]),
                        (r = o[_ + 1]),
                        (n = o[_ + 2]),
                        (a = 2 === m ? 0 : o[_ + 3]),
                        (o[c++] = p =
                          3 === m
                            ? new l(s, r, n, a)
                            : new l(s, (2 * r + s) / 3, (2 * r + n) / 3, n));
                    o.length = c;
                  }
                  return d;
                })(h, e.type, _)),
          (this._segCount = this._beziers[s].length),
          this._timeRes)
        ) {
          var d = (function(t, e) {
            var i,
              s,
              r,
              n,
              a = [],
              o = [],
              l = 0,
              h = 0,
              _ = (e = e >> 0 || 6) - 1,
              u = [],
              f = [];
            for (i in t) c(t[i], a, e);
            for (r = a.length, s = 0; r > s; s++)
              (l += Math.sqrt(a[s])),
                (n = s % e),
                (f[n] = l),
                n === _ &&
                  ((h += l),
                  (n = (s / e) >> 0),
                  (u[n] = f),
                  (o[n] = h),
                  (l = 0),
                  (f = []));
            return { length: h, lengths: o, segments: u };
          })(this._beziers, this._timeRes);
          (this._length = d.length),
            (this._lengths = d.lengths),
            (this._segments = d.segments),
            (this._l1 = this._li = this._s1 = this._si = 0),
            (this._l2 = this._lengths[0]),
            (this._curSeg = this._segments[0]),
            (this._s2 = this._curSeg[0]),
            (this._prec = 1 / this._curSeg.length);
        }
        if ((p = this._autoRotate))
          for (
            this._initialRotations = [],
              p[0] instanceof Array || (this._autoRotate = p = [p]),
              n = p.length;
            --n > -1;

          ) {
            for (a = 0; 3 > a; a++)
              (s = p[n][a]),
                (this._func[s] =
                  'function' == typeof t[s] &&
                  t[
                    s.indexOf('set') ||
                    'function' != typeof t['get' + s.substr(3)]
                      ? s
                      : 'get' + s.substr(3)
                  ]);
            (s = p[n][2]),
              (this._initialRotations[n] =
                (this._func[s]
                  ? this._func[s].call(this._target)
                  : this._target[s]) || 0),
              this._overwriteProps.push(s);
          }
        return (this._startRatio = i.vars.runBackwards ? 1 : 0), !0;
      },
      set: function(t) {
        var e,
          s,
          r,
          n,
          a,
          o,
          l,
          h,
          _,
          u,
          f = this._segCount,
          c = this._func,
          p = this._target,
          d = t !== this._startRatio;
        if (this._timeRes) {
          if (
            ((_ = this._lengths),
            (u = this._curSeg),
            (t *= this._length),
            (r = this._li),
            t > this._l2 && f - 1 > r)
          ) {
            for (h = f - 1; h > r && (this._l2 = _[++r]) <= t; );
            (this._l1 = _[r - 1]),
              (this._li = r),
              (this._curSeg = u = this._segments[r]),
              (this._s2 = u[(this._s1 = this._si = 0)]);
          } else if (t < this._l1 && r > 0) {
            for (; r > 0 && (this._l1 = _[--r]) >= t; );
            0 === r && t < this._l1 ? (this._l1 = 0) : r++,
              (this._l2 = _[r]),
              (this._li = r),
              (this._curSeg = u = this._segments[r]),
              (this._s1 = u[(this._si = u.length - 1) - 1] || 0),
              (this._s2 = u[this._si]);
          }
          if (
            ((e = r),
            (t -= this._l1),
            (r = this._si),
            t > this._s2 && r < u.length - 1)
          ) {
            for (h = u.length - 1; h > r && (this._s2 = u[++r]) <= t; );
            (this._s1 = u[r - 1]), (this._si = r);
          } else if (t < this._s1 && r > 0) {
            for (; r > 0 && (this._s1 = u[--r]) >= t; );
            0 === r && t < this._s1 ? (this._s1 = 0) : r++,
              (this._s2 = u[r]),
              (this._si = r);
          }
          o = (r + (t - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
        } else
          (e = 0 > t ? 0 : t >= 1 ? f - 1 : (f * t) >> 0),
            (o = (t - e * (1 / f)) * f);
        for (s = 1 - o, r = this._props.length; --r > -1; )
          (n = this._props[r]),
            (a = this._beziers[n][e]),
            (l = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a),
            this._mod[n] && (l = this._mod[n](l, p)),
            c[n] ? p[n](l) : (p[n] = l);
        if (this._autoRotate) {
          var m,
            g,
            y,
            v,
            T,
            x,
            b,
            w = this._autoRotate;
          for (r = w.length; --r > -1; )
            (n = w[r][2]),
              (x = w[r][3] || 0),
              (b = !0 === w[r][4] ? 1 : i),
              (a = this._beziers[w[r][0]]),
              (m = this._beziers[w[r][1]]),
              a &&
                m &&
                ((a = a[e]),
                (m = m[e]),
                (g = a.a + (a.b - a.a) * o),
                (v = a.b + (a.c - a.b) * o),
                (g += (v - g) * o),
                (v += (a.c + (a.d - a.c) * o - v) * o),
                (y = m.a + (m.b - m.a) * o),
                (T = m.b + (m.c - m.b) * o),
                (y += (T - y) * o),
                (T += (m.c + (m.d - m.c) * o - T) * o),
                (l = d
                  ? Math.atan2(T - y, v - g) * b + x
                  : this._initialRotations[r]),
                this._mod[n] && (l = this._mod[n](l, p)),
                c[n] ? p[n](l) : (p[n] = l));
        }
      }
    })),
    (d = p.prototype),
    (p.bezierThrough = f),
    (p.cubicToQuadratic = h),
    (p._autoCSS = !0),
    (p.quadraticToCubic = function(t, e, i) {
      return new l(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
    }),
    (p._cssRegister = function() {
      var t = o.CSSPlugin;
      if (t) {
        var e = t._internals,
          i = e._parseToProxy,
          s = e._setPluginRatio,
          r = e.CSSPropTween;
        e._registerComplexSpecialProp('bezier', {
          parser: function(t, e, n, a, o, l) {
            e instanceof Array && (e = { values: e }), (l = new p());
            var h,
              _,
              u,
              f = e.values,
              c = f.length - 1,
              d = [],
              m = {};
            if (0 > c) return o;
            for (h = 0; c >= h; h++)
              (u = i(t, f[h], a, o, l, c !== h)), (d[h] = u.end);
            for (_ in e) m[_] = e[_];
            return (
              (m.values = d),
              ((o = new r(t, 'bezier', 0, 0, u.pt, 2)).data = u),
              (o.plugin = l),
              (o.setRatio = s),
              0 === m.autoRotate && (m.autoRotate = !0),
              !m.autoRotate ||
                m.autoRotate instanceof Array ||
                ((h = !0 === m.autoRotate ? 0 : Number(m.autoRotate)),
                (m.autoRotate =
                  null != u.end.left
                    ? [['left', 'top', 'rotation', h, !1]]
                    : null != u.end.x && [['x', 'y', 'rotation', h, !1]])),
              m.autoRotate &&
                (a._transform || a._enableTransforms(!1),
                (u.autoRotate = a._target._gsTransform),
                (u.proxy.rotation = u.autoRotate.rotation || 0),
                a._overwriteProps.push('rotation')),
              l._onInitTween(u.proxy, m, a._tween),
              o
            );
          }
        });
      }
    }),
    (d._mod = function(t) {
      for (var e, i = this._overwriteProps, s = i.length; --s > -1; )
        (e = t[i[s]]), e && 'function' == typeof e && (this._mod[i[s]] = e);
    }),
    (d._kill = function(t) {
      var e,
        i,
        s = this._props;
      for (e in this._beziers)
        if (e in t)
          for (
            delete this._beziers[e], delete this._func[e], i = s.length;
            --i > -1;

          )
            s[i] === e && s.splice(i, 1);
      if ((s = this._autoRotate))
        for (i = s.length; --i > -1; ) t[s[i][2]] && s.splice(i, 1);
      return this._super._kill.call(this, t);
    }),
    _gsScope._gsDefine(
      'plugins.CSSPlugin',
      ['plugins.TweenPlugin', 'TweenLite'],
      function(t, e) {
        var i,
          s,
          r,
          n,
          a = function() {
            t.call(this, 'css'),
              (this._overwriteProps.length = 0),
              (this.setRatio = a.prototype.setRatio);
          },
          o = _gsScope._gsDefine.globals,
          l = {},
          h = (a.prototype = new t('css'));
        (h.constructor = a),
          (a.version = '1.20.3'),
          (a.API = 2),
          (a.defaultTransformPerspective = 0),
          (a.defaultSkewType = 'compensated'),
          (a.defaultSmoothOrigin = !0),
          (h = 'px'),
          (a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: ''
          });
        var _,
          u,
          f,
          c,
          p,
          d,
          m,
          g,
          y,
          v,
          T = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
          x = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          b = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          w = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
          P = /(?:\d|\-|\+|=|#|\.)*/g,
          O = /opacity *= *([^)]*)/i,
          S = /opacity:([^;]*)/i,
          k = /alpha\(opacity *=.+?\)/i,
          R = /^(rgb|hsl)/,
          A = /([A-Z])/g,
          C = /-([a-z])/gi,
          D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          M = function(t, e) {
            return e.toUpperCase();
          },
          F = /(?:Left|Right|Width)/i,
          z = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          E = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          I = /,(?=[^\)]*(?:\(|$))/gi,
          X = /[\s,\(]/i,
          N = Math.PI / 180,
          L = 180 / Math.PI,
          B = {},
          Y = { style: {} },
          j = _gsScope.document || {
            createElement: function() {
              return Y;
            }
          },
          U = function(t, e) {
            return j.createElementNS
              ? j.createElementNS(e || 'http://www.w3.org/1999/xhtml', t)
              : j.createElement(t);
          },
          V = U('div'),
          q = U('img'),
          W = (a._internals = { _specialProps: l }),
          G = (_gsScope.navigator || {}).userAgent || '',
          Z =
            ((y = G.indexOf('Android')),
            (v = U('a')),
            (f =
              -1 !== G.indexOf('Safari') &&
              -1 === G.indexOf('Chrome') &&
              (-1 === y || parseFloat(G.substr(y + 8, 2)) > 3)),
            (p = f && parseFloat(G.substr(G.indexOf('Version/') + 8, 2)) < 6),
            (c = -1 !== G.indexOf('Firefox')),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(G) ||
              /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(G)) &&
              (d = parseFloat(RegExp.$1)),
            !!v &&
              ((v.style.cssText = 'top:1px;opacity:.55;'),
              /^0.55/.test(v.style.opacity))),
          H = function(t) {
            return O.test(
              'string' == typeof t
                ? t
                : (t.currentStyle ? t.currentStyle.filter : t.style.filter) ||
                    ''
            )
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          $ = function(t) {
            _gsScope.console && console.log(t);
          },
          Q = '',
          K = '',
          J = function(t, e) {
            var i,
              s,
              r = (e = e || V).style;
            if (void 0 !== r[t]) return t;
            for (
              t = t.charAt(0).toUpperCase() + t.substr(1),
                i = ['O', 'Moz', 'ms', 'Ms', 'Webkit'],
                s = 5;
              --s > -1 && void 0 === r[i[s] + t];

            );
            return s >= 0
              ? ((Q = '-' + (K = 3 === s ? 'ms' : i[s]).toLowerCase() + '-'),
                K + t)
              : null;
          },
          tt = j.defaultView ? j.defaultView.getComputedStyle : function() {},
          et = (a.getStyle = function(t, e, i, s, r) {
            var n;
            return Z || 'opacity' !== e
              ? (!s && t.style[e]
                  ? (n = t.style[e])
                  : (i = i || tt(t))
                  ? (n =
                      i[e] ||
                      i.getPropertyValue(e) ||
                      i.getPropertyValue(e.replace(A, '-$1').toLowerCase()))
                  : t.currentStyle && (n = t.currentStyle[e]),
                null == r ||
                (n && 'none' !== n && 'auto' !== n && 'auto auto' !== n)
                  ? n
                  : r)
              : H(t);
          }),
          it = (W.convertToPixels = function(t, i, s, r, n) {
            if ('px' === r || (!r && 'lineHeight' !== i)) return s;
            if ('auto' === r || !s) return 0;
            var o,
              l,
              h,
              _ = F.test(i),
              u = t,
              f = V.style,
              c = 0 > s,
              p = 1 === s;
            if ((c && (s = -s), p && (s *= 100), 'lineHeight' !== i || r))
              if ('%' === r && -1 !== i.indexOf('border'))
                o = (s / 100) * (_ ? t.clientWidth : t.clientHeight);
              else {
                if (
                  ((f.cssText =
                    'border:0 solid red;position:' +
                    et(t, 'position') +
                    ';line-height:0;'),
                  '%' !== r &&
                    u.appendChild &&
                    'v' !== r.charAt(0) &&
                    'rem' !== r)
                )
                  f[_ ? 'borderLeftWidth' : 'borderTopWidth'] = s + r;
                else {
                  if (
                    ((u = t.parentNode || j.body),
                    -1 !== et(u, 'display').indexOf('flex') &&
                      (f.position = 'absolute'),
                    (l = u._gsCache),
                    (h = e.ticker.frame),
                    l && _ && l.time === h)
                  )
                    return (l.width * s) / 100;
                  f[_ ? 'width' : 'height'] = s + r;
                }
                u.appendChild(V),
                  (o = parseFloat(V[_ ? 'offsetWidth' : 'offsetHeight'])),
                  u.removeChild(V),
                  _ &&
                    '%' === r &&
                    !1 !== a.cacheWidths &&
                    (((l = u._gsCache = u._gsCache || {}).time = h),
                    (l.width = (o / s) * 100)),
                  0 !== o || n || (o = it(t, i, s, r, !0));
              }
            else
              (l = tt(t).lineHeight),
                (t.style.lineHeight = s),
                (o = parseFloat(tt(t).lineHeight)),
                (t.style.lineHeight = l);
            return p && (o /= 100), c ? -o : o;
          }),
          st = (W.calculateOffset = function(t, e, i) {
            if ('absolute' !== et(t, 'position', i)) return 0;
            var s = 'left' === e ? 'Left' : 'Top',
              r = et(t, 'margin' + s, i);
            return (
              t['offset' + s] - (it(t, e, parseFloat(r), r.replace(P, '')) || 0)
            );
          }),
          rt = function(t, e) {
            var i,
              s,
              r,
              n = {};
            if ((e = e || tt(t, null)))
              if ((i = e.length))
                for (; --i > -1; )
                  (r = e[i]),
                    (-1 === r.indexOf('-transform') || Et === r) &&
                      (n[r.replace(C, M)] = e.getPropertyValue(r));
              else
                for (i in e)
                  (-1 === i.indexOf('Transform') || zt === i) && (n[i] = e[i]);
            else if ((e = t.currentStyle || t.style))
              for (i in e)
                'string' == typeof i &&
                  void 0 === n[i] &&
                  (n[i.replace(C, M)] = e[i]);
            return (
              Z || (n.opacity = H(t)),
              (s = Zt(t, e, !1)),
              (n.rotation = s.rotation),
              (n.skewX = s.skewX),
              (n.scaleX = s.scaleX),
              (n.scaleY = s.scaleY),
              (n.x = s.x),
              (n.y = s.y),
              Xt &&
                ((n.z = s.z),
                (n.rotationX = s.rotationX),
                (n.rotationY = s.rotationY),
                (n.scaleZ = s.scaleZ)),
              n.filters && delete n.filters,
              n
            );
          },
          nt = function(t, e, i, s, r) {
            var n,
              a,
              o,
              l = {},
              h = t.style;
            for (a in i)
              'cssText' !== a &&
                'length' !== a &&
                isNaN(a) &&
                (e[a] !== (n = i[a]) || (r && r[a])) &&
                -1 === a.indexOf('Origin') &&
                ('number' == typeof n || 'string' == typeof n) &&
                ((l[a] =
                  'auto' !== n || ('left' !== a && 'top' !== a)
                    ? ('' !== n && 'auto' !== n && 'none' !== n) ||
                      'string' != typeof e[a] ||
                      '' === e[a].replace(w, '')
                      ? n
                      : 0
                    : st(t, a)),
                void 0 !== h[a] && (o = new Tt(h, a, h[a], o)));
            if (s) for (a in s) 'className' !== a && (l[a] = s[a]);
            return { difs: l, firstMPT: o };
          },
          at = { width: ['Left', 'Right'], height: ['Top', 'Bottom'] },
          ot = ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
          lt = function(t, e, i) {
            if ('svg' === (t.nodeName + '').toLowerCase())
              return (i || tt(t))[e] || 0;
            if (t.getCTM && qt(t)) return t.getBBox()[e] || 0;
            var s = parseFloat('width' === e ? t.offsetWidth : t.offsetHeight),
              r = at[e],
              n = r.length;
            for (i = i || tt(t, null); --n > -1; )
              (s -= parseFloat(et(t, 'padding' + r[n], i, !0)) || 0),
                (s -= parseFloat(et(t, 'border' + r[n] + 'Width', i, !0)) || 0);
            return s;
          },
          ht = function(t, e) {
            if ('contain' === t || 'auto' === t || 'auto auto' === t)
              return t + ' ';
            (null == t || '' === t) && (t = '0 0');
            var i,
              s = t.split(' '),
              r =
                -1 !== t.indexOf('left')
                  ? '0%'
                  : -1 !== t.indexOf('right')
                  ? '100%'
                  : s[0],
              n =
                -1 !== t.indexOf('top')
                  ? '0%'
                  : -1 !== t.indexOf('bottom')
                  ? '100%'
                  : s[1];
            if (s.length > 3 && !e) {
              for (
                s = t
                  .split(', ')
                  .join(',')
                  .split(','),
                  t = [],
                  i = 0;
                i < s.length;
                i++
              )
                t.push(ht(s[i]));
              return t.join(',');
            }
            return (
              null == n
                ? (n = 'center' === r ? '50%' : '0')
                : 'center' === n && (n = '50%'),
              ('center' === r ||
                (isNaN(parseFloat(r)) && -1 === (r + '').indexOf('='))) &&
                (r = '50%'),
              (t = r + ' ' + n + (s.length > 2 ? ' ' + s[2] : '')),
              e &&
                ((e.oxp = -1 !== r.indexOf('%')),
                (e.oyp = -1 !== n.indexOf('%')),
                (e.oxr = '=' === r.charAt(1)),
                (e.oyr = '=' === n.charAt(1)),
                (e.ox = parseFloat(r.replace(w, ''))),
                (e.oy = parseFloat(n.replace(w, ''))),
                (e.v = t)),
              e || t
            );
          },
          _t = function(t, e) {
            return (
              'function' == typeof t && (t = t(g, m)),
              'string' == typeof t && '=' === t.charAt(1)
                ? parseInt(t.charAt(0) + '1', 10) * parseFloat(t.substr(2))
                : parseFloat(t) - parseFloat(e) || 0
            );
          },
          ut = function(t, e) {
            return (
              'function' == typeof t && (t = t(g, m)),
              null == t
                ? e
                : 'string' == typeof t && '=' === t.charAt(1)
                ? parseInt(t.charAt(0) + '1', 10) * parseFloat(t.substr(2)) + e
                : parseFloat(t) || 0
            );
          },
          ft = function(t, e, i, s) {
            var r, n, a, o, l;
            return (
              'function' == typeof t && (t = t(g, m)),
              null == t
                ? (o = e)
                : 'number' == typeof t
                ? (o = t)
                : ((r = 360),
                  (n = t.split('_')),
                  (a =
                    ((l = '=' === t.charAt(1))
                      ? parseInt(t.charAt(0) + '1', 10) *
                        parseFloat(n[0].substr(2))
                      : parseFloat(n[0])) *
                      (-1 === t.indexOf('rad') ? 1 : L) -
                    (l ? 0 : e)),
                  n.length &&
                    (s && (s[i] = e + a),
                    -1 !== t.indexOf('short') &&
                      (a %= r) !== a % (r / 2) &&
                      (a = 0 > a ? a + r : a - r),
                    -1 !== t.indexOf('_cw') && 0 > a
                      ? (a = ((a + 9999999999 * r) % r) - ((a / r) | 0) * r)
                      : -1 !== t.indexOf('ccw') &&
                        a > 0 &&
                        (a = ((a - 9999999999 * r) % r) - ((a / r) | 0) * r)),
                  (o = e + a)),
              1e-6 > o && o > -1e-6 && (o = 0),
              o
            );
          },
          ct = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
          },
          pt = function(t, e, i) {
            return (
              (255 *
                (1 > 6 * (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t)
                  ? e + (i - e) * t * 6
                  : 0.5 > t
                  ? i
                  : 2 > 3 * t
                  ? e + (i - e) * (2 / 3 - t) * 6
                  : e) +
                0.5) |
              0
            );
          },
          dt = (a.parseColor = function(t, e) {
            var i, s, r, n, a, o, l, h, _, u, f;
            if (t)
              if ('number' == typeof t) i = [t >> 16, (t >> 8) & 255, 255 & t];
              else {
                if (
                  (',' === t.charAt(t.length - 1) &&
                    (t = t.substr(0, t.length - 1)),
                  ct[t])
                )
                  i = ct[t];
                else if ('#' === t.charAt(0))
                  4 === t.length &&
                    ((s = t.charAt(1)),
                    (r = t.charAt(2)),
                    (n = t.charAt(3)),
                    (t = '#' + s + s + r + r + n + n)),
                    (t = parseInt(t.substr(1), 16)),
                    (i = [t >> 16, (t >> 8) & 255, 255 & t]);
                else if ('hsl' === t.substr(0, 3))
                  if (((i = f = t.match(T)), e)) {
                    if (-1 !== t.indexOf('=')) return t.match(x);
                  } else
                    (a = (Number(i[0]) % 360) / 360),
                      (o = Number(i[1]) / 100),
                      (l = Number(i[2]) / 100),
                      (r = 0.5 >= l ? l * (o + 1) : l + o - l * o),
                      (s = 2 * l - r),
                      i.length > 3 && (i[3] = Number(i[3])),
                      (i[0] = pt(a + 1 / 3, s, r)),
                      (i[1] = pt(a, s, r)),
                      (i[2] = pt(a - 1 / 3, s, r));
                else i = t.match(T) || ct.transparent;
                (i[0] = Number(i[0])),
                  (i[1] = Number(i[1])),
                  (i[2] = Number(i[2])),
                  i.length > 3 && (i[3] = Number(i[3]));
              }
            else i = ct.black;
            return (
              e &&
                !f &&
                ((s = i[0] / 255),
                (r = i[1] / 255),
                (n = i[2] / 255),
                (l = ((h = Math.max(s, r, n)) + (_ = Math.min(s, r, n))) / 2),
                h === _
                  ? (a = o = 0)
                  : ((u = h - _),
                    (o = l > 0.5 ? u / (2 - h - _) : u / (h + _)),
                    (a =
                      h === s
                        ? (r - n) / u + (n > r ? 6 : 0)
                        : h === r
                        ? (n - s) / u + 2
                        : (s - r) / u + 4),
                    (a *= 60)),
                (i[0] = (a + 0.5) | 0),
                (i[1] = (100 * o + 0.5) | 0),
                (i[2] = (100 * l + 0.5) | 0)),
              i
            );
          }),
          mt = function(t, e) {
            var i,
              s,
              r,
              n = t.match(gt) || [],
              a = 0,
              o = '';
            if (!n.length) return t;
            for (i = 0; i < n.length; i++)
              (s = n[i]),
                (r = t.substr(a, t.indexOf(s, a) - a)),
                (a += r.length + s.length),
                (s = dt(s, e)),
                3 === s.length && s.push(1),
                (o +=
                  r +
                  (e
                    ? 'hsla(' + s[0] + ',' + s[1] + '%,' + s[2] + '%,' + s[3]
                    : 'rgba(' + s.join(',')) +
                  ')');
            return o + t.substr(a);
          },
          gt =
            '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b';
        for (h in ct) gt += '|' + h + '\\b';
        (gt = new RegExp(gt + ')', 'gi')),
          (a.colorStringFilter = function(t) {
            var e,
              i = t[0] + ' ' + t[1];
            gt.test(i) &&
              ((e = -1 !== i.indexOf('hsl(') || -1 !== i.indexOf('hsla(')),
              (t[0] = mt(t[0], e)),
              (t[1] = mt(t[1], e))),
              (gt.lastIndex = 0);
          }),
          e.defaultStringFilter ||
            (e.defaultStringFilter = a.colorStringFilter);
        var yt = function(t, e, i, s) {
            if (null == t)
              return function(t) {
                return t;
              };
            var r,
              n = e ? (t.match(gt) || [''])[0] : '',
              a =
                t
                  .split(n)
                  .join('')
                  .match(b) || [],
              o = t.substr(0, t.indexOf(a[0])),
              l = ')' === t.charAt(t.length - 1) ? ')' : '',
              h = -1 !== t.indexOf(' ') ? ' ' : ',',
              _ = a.length,
              u = _ > 0 ? a[0].replace(T, '') : '';
            return _
              ? (r = e
                  ? function(t) {
                      var e, f, c, p;
                      if ('number' == typeof t) t += u;
                      else if (s && I.test(t)) {
                        for (
                          p = t.replace(I, '|').split('|'), c = 0;
                          c < p.length;
                          c++
                        )
                          p[c] = r(p[c]);
                        return p.join(',');
                      }
                      if (
                        ((e = (t.match(gt) || [n])[0]),
                        (c = (f =
                          t
                            .split(e)
                            .join('')
                            .match(b) || []).length),
                        _ > c--)
                      )
                        for (; ++c < _; )
                          f[c] = i ? f[((c - 1) / 2) | 0] : a[c];
                      return (
                        o +
                        f.join(h) +
                        h +
                        e +
                        l +
                        (-1 !== t.indexOf('inset') ? ' inset' : '')
                      );
                    }
                  : function(t) {
                      var e, n, f;
                      if ('number' == typeof t) t += u;
                      else if (s && I.test(t)) {
                        for (
                          n = t.replace(I, '|').split('|'), f = 0;
                          f < n.length;
                          f++
                        )
                          n[f] = r(n[f]);
                        return n.join(',');
                      }
                      if (((f = (e = t.match(b) || []).length), _ > f--))
                        for (; ++f < _; )
                          e[f] = i ? e[((f - 1) / 2) | 0] : a[f];
                      return o + e.join(h) + l;
                    })
              : function(t) {
                  return t;
                };
          },
          vt = function(t) {
            return (
              (t = t.split(',')),
              function(e, i, s, r, n, a, o) {
                var l,
                  h = (i + '').split(' ');
                for (o = {}, l = 0; 4 > l; l++)
                  o[t[l]] = h[l] = h[l] || h[((l - 1) / 2) >> 0];
                return r.parse(e, o, n, a);
              }
            );
          },
          Tt =
            ((W._setPluginRatio = function(t) {
              this.plugin.setRatio(t);
              for (
                var e, i, s, r, n, a = this.data, o = a.proxy, l = a.firstMPT;
                l;

              )
                (e = o[l.v]),
                  l.r ? (e = Math.round(e)) : 1e-6 > e && e > -1e-6 && (e = 0),
                  (l.t[l.p] = e),
                  (l = l._next);
              if (
                (a.autoRotate &&
                  (a.autoRotate.rotation = a.mod
                    ? a.mod(o.rotation, this.t)
                    : o.rotation),
                1 === t || 0 === t)
              )
                for (l = a.firstMPT, n = 1 === t ? 'e' : 'b'; l; ) {
                  if ((i = l.t).type) {
                    if (1 === i.type) {
                      for (r = i.xs0 + i.s + i.xs1, s = 1; s < i.l; s++)
                        r += i['xn' + s] + i['xs' + (s + 1)];
                      i[n] = r;
                    }
                  } else i[n] = i.s + i.xs0;
                  l = l._next;
                }
            }),
            function(t, e, i, s, r) {
              (this.t = t),
                (this.p = e),
                (this.v = i),
                (this.r = r),
                s && ((s._prev = this), (this._next = s));
            }),
          xt =
            ((W._parseToProxy = function(t, e, i, s, r, n) {
              var a,
                o,
                l,
                h,
                _,
                u = s,
                f = {},
                c = {},
                p = i._transform,
                d = B;
              for (
                i._transform = null,
                  B = e,
                  s = _ = i.parse(t, e, s, r),
                  B = d,
                  n &&
                    ((i._transform = p),
                    u && ((u._prev = null), u._prev && (u._prev._next = null)));
                s && s !== u;

              ) {
                if (
                  s.type <= 1 &&
                  ((c[(o = s.p)] = s.s + s.c),
                  (f[o] = s.s),
                  n || ((h = new Tt(s, 's', o, h, s.r)), (s.c = 0)),
                  1 === s.type)
                )
                  for (a = s.l; --a > 0; )
                    (l = 'xn' + a),
                      (o = s.p + '_' + l),
                      (c[o] = s.data[l]),
                      (f[o] = s[l]),
                      n || (h = new Tt(s, l, o, h, s.rxp[l]));
                s = s._next;
              }
              return { proxy: f, end: c, firstMPT: h, pt: _ };
            }),
            (W.CSSPropTween = function(t, e, s, r, a, o, l, h, _, u, f) {
              (this.t = t),
                (this.p = e),
                (this.s = s),
                (this.c = r),
                (this.n = l || e),
                t instanceof xt || n.push(this.n),
                (this.r = h),
                (this.type = o || 0),
                _ && ((this.pr = _), (i = !0)),
                (this.b = void 0 === u ? s : u),
                (this.e = void 0 === f ? s + r : f),
                a && ((this._next = a), (a._prev = this));
            })),
          bt = function(t, e, i, s, r, n) {
            var a = new xt(t, e, i, s - i, r, -1, n);
            return (a.b = i), (a.e = a.xs0 = s), a;
          },
          wt = (a.parseComplex = function(t, e, i, s, r, n, o, l, h, u) {
            (i = i || n || ''),
              'function' == typeof s && (s = s(g, m)),
              (o = new xt(t, e, 0, 0, o, u ? 2 : 1, null, !1, l, i, s)),
              (s += ''),
              r &&
                gt.test(s + i) &&
                ((s = [i, s]), a.colorStringFilter(s), (i = s[0]), (s = s[1]));
            var f,
              c,
              p,
              d,
              y,
              v,
              b,
              w,
              P,
              O,
              S,
              k,
              R,
              A = i
                .split(', ')
                .join(',')
                .split(' '),
              C = s
                .split(', ')
                .join(',')
                .split(' '),
              D = A.length,
              M = !1 !== _;
            for (
              (-1 !== s.indexOf(',') || -1 !== i.indexOf(',')) &&
                (-1 !== (s + i).indexOf('rgb') || -1 !== (s + i).indexOf('hsl')
                  ? ((A = A.join(' ')
                      .replace(I, ', ')
                      .split(' ')),
                    (C = C.join(' ')
                      .replace(I, ', ')
                      .split(' ')))
                  : ((A = A.join(' ')
                      .split(',')
                      .join(', ')
                      .split(' ')),
                    (C = C.join(' ')
                      .split(',')
                      .join(', ')
                      .split(' '))),
                (D = A.length)),
                D !== C.length && (D = (A = (n || '').split(' ')).length),
                o.plugin = h,
                o.setRatio = u,
                gt.lastIndex = 0,
                f = 0;
              D > f;
              f++
            )
              if (((d = A[f]), (y = C[f]), (w = parseFloat(d)), w || 0 === w))
                o.appendXtra(
                  '',
                  w,
                  _t(y, w),
                  y.replace(x, ''),
                  M && -1 !== y.indexOf('px'),
                  !0
                );
              else if (r && gt.test(d))
                (k = y.indexOf(')') + 1),
                  (k = ')' + (k ? y.substr(k) : '')),
                  (R = -1 !== y.indexOf('hsl') && Z),
                  (O = y),
                  (d = dt(d, R)),
                  (y = dt(y, R)),
                  (P = d.length + y.length > 6),
                  P && !Z && 0 === y[3]
                    ? ((o['xs' + o.l] += o.l ? ' transparent' : 'transparent'),
                      (o.e = o.e.split(C[f]).join('transparent')))
                    : (Z || (P = !1),
                      R
                        ? o
                            .appendXtra(
                              O.substr(0, O.indexOf('hsl')) +
                                (P ? 'hsla(' : 'hsl('),
                              d[0],
                              _t(y[0], d[0]),
                              ',',
                              !1,
                              !0
                            )
                            .appendXtra('', d[1], _t(y[1], d[1]), '%,', !1)
                            .appendXtra(
                              '',
                              d[2],
                              _t(y[2], d[2]),
                              P ? '%,' : '%' + k,
                              !1
                            )
                        : o
                            .appendXtra(
                              O.substr(0, O.indexOf('rgb')) +
                                (P ? 'rgba(' : 'rgb('),
                              d[0],
                              y[0] - d[0],
                              ',',
                              !0,
                              !0
                            )
                            .appendXtra('', d[1], y[1] - d[1], ',', !0)
                            .appendXtra('', d[2], y[2] - d[2], P ? ',' : k, !0),
                      P &&
                        ((d = d.length < 4 ? 1 : d[3]),
                        o.appendXtra(
                          '',
                          d,
                          (y.length < 4 ? 1 : y[3]) - d,
                          k,
                          !1
                        ))),
                  (gt.lastIndex = 0);
              else if ((v = d.match(T))) {
                if (!(b = y.match(x)) || b.length !== v.length) return o;
                for (p = 0, c = 0; c < v.length; c++)
                  (S = v[c]),
                    (O = d.indexOf(S, p)),
                    o.appendXtra(
                      d.substr(p, O - p),
                      Number(S),
                      _t(b[c], S),
                      '',
                      M && 'px' === d.substr(O + S.length, 2),
                      0 === c
                    ),
                    (p = O + S.length);
                o['xs' + o.l] += d.substr(p);
              } else o['xs' + o.l] += o.l || o['xs' + o.l] ? ' ' + y : y;
            if (-1 !== s.indexOf('=') && o.data) {
              for (k = o.xs0 + o.data.s, f = 1; f < o.l; f++)
                k += o['xs' + f] + o.data['xn' + f];
              o.e = k + o['xs' + f];
            }
            return o.l || ((o.type = -1), (o.xs0 = o.e)), o.xfirst || o;
          }),
          Pt = 9;
        for ((h = xt.prototype).l = h.pr = 0; --Pt > 0; )
          (h['xn' + Pt] = 0), (h['xs' + Pt] = '');
        (h.xs0 = ''),
          (h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null),
          (h.appendXtra = function(t, e, i, s, r, n) {
            var a = this,
              o = a.l;
            return (
              (a['xs' + o] += n && (o || a['xs' + o]) ? ' ' + t : t || ''),
              i || 0 === o || a.plugin
                ? (a.l++,
                  (a.type = a.setRatio ? 2 : 1),
                  (a['xs' + a.l] = s || ''),
                  o > 0
                    ? ((a.data['xn' + o] = e + i),
                      (a.rxp['xn' + o] = r),
                      (a['xn' + o] = e),
                      a.plugin ||
                        ((a.xfirst = new xt(
                          a,
                          'xn' + o,
                          e,
                          i,
                          a.xfirst || a,
                          0,
                          a.n,
                          r,
                          a.pr
                        )),
                        (a.xfirst.xs0 = 0)),
                      a)
                    : ((a.data = { s: e + i }),
                      (a.rxp = {}),
                      (a.s = e),
                      (a.c = i),
                      (a.r = r),
                      a))
                : ((a['xs' + o] += e + (s || '')), a)
            );
          });
        var Ot = function(t, e) {
            (e = e || {}),
              (this.p = (e.prefix && J(t)) || t),
              (l[t] = l[this.p] = this),
              (this.format =
                e.formatter ||
                yt(e.defaultValue, e.color, e.collapsible, e.multi)),
              e.parser && (this.parse = e.parser),
              (this.clrs = e.color),
              (this.multi = e.multi),
              (this.keyword = e.keyword),
              (this.dflt = e.defaultValue),
              (this.pr = e.priority || 0);
          },
          St = (W._registerComplexSpecialProp = function(t, e, i) {
            'object' != typeof e && (e = { parser: i });
            var s,
              r = t.split(','),
              n = e.defaultValue;
            for (i = i || [n], s = 0; s < r.length; s++)
              (e.prefix = 0 === s && e.prefix),
                (e.defaultValue = i[s] || n),
                new Ot(r[s], e);
          }),
          kt = (W._registerPluginProp = function(t) {
            if (!l[t]) {
              var e = t.charAt(0).toUpperCase() + t.substr(1) + 'Plugin';
              St(t, {
                parser: function(t, i, s, r, n, a, h) {
                  var _ = o.com.greensock.plugins[e];
                  return _
                    ? (_._cssRegister(), l[s].parse(t, i, s, r, n, a, h))
                    : ($('Error: ' + e + ' js file not loaded.'), n);
                }
              });
            }
          });
        ((h = Ot.prototype).parseComplex = function(t, e, i, s, r, n) {
          var a,
            o,
            l,
            h,
            _,
            u,
            f = this.keyword;
          if (
            (this.multi &&
              (I.test(i) || I.test(e)
                ? ((o = e.replace(I, '|').split('|')),
                  (l = i.replace(I, '|').split('|')))
                : f && ((o = [e]), (l = [i]))),
            l)
          ) {
            for (
              h = l.length > o.length ? l.length : o.length, a = 0;
              h > a;
              a++
            )
              (e = o[a] = o[a] || this.dflt),
                (i = l[a] = l[a] || this.dflt),
                f &&
                  ((_ = e.indexOf(f)),
                  (u = i.indexOf(f)),
                  _ !== u &&
                    (-1 === u
                      ? (o[a] = o[a].split(f).join(''))
                      : -1 === _ && (o[a] += ' ' + f)));
            (e = o.join(', ')), (i = l.join(', '));
          }
          return wt(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n);
        }),
          (h.parse = function(t, e, i, s, n, a, o) {
            return this.parseComplex(
              t.style,
              this.format(et(t, this.p, r, !1, this.dflt)),
              this.format(e),
              n,
              a
            );
          }),
          (a.registerSpecialProp = function(t, e, i) {
            St(t, {
              parser: function(t, s, r, n, a, o, l) {
                var h = new xt(t, r, 0, 0, a, 2, r, !1, i);
                return (h.plugin = o), (h.setRatio = e(t, s, n._tween, r)), h;
              },
              priority: i
            });
          }),
          (a.useSVGTransformAttr = !0);
        var Rt,
          At,
          Ct,
          Dt,
          Mt,
          Ft = 'scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent'.split(
            ','
          ),
          zt = J('transform'),
          Et = Q + 'transform',
          It = J('transformOrigin'),
          Xt = null !== J('perspective'),
          Nt = (W.Transform = function() {
            (this.perspective = parseFloat(a.defaultTransformPerspective) || 0),
              (this.force3D =
                !(!1 === a.defaultForce3D || !Xt) &&
                (a.defaultForce3D || 'auto'));
          }),
          Lt = _gsScope.SVGElement,
          Bt = function(t, e, i) {
            var s,
              r = j.createElementNS('http://www.w3.org/2000/svg', t),
              n = /([a-z])([A-Z])/g;
            for (s in i)
              r.setAttributeNS(null, s.replace(n, '$1-$2').toLowerCase(), i[s]);
            return e.appendChild(r), r;
          },
          Yt = j.documentElement || {},
          jt =
            ((Mt = d || (/Android/i.test(G) && !_gsScope.chrome)),
            j.createElementNS &&
              !Mt &&
              ((At = Bt('svg', Yt)),
              (Dt = (Ct = Bt('rect', At, {
                width: 100,
                height: 50,
                x: 100
              })).getBoundingClientRect().width),
              (Ct.style[It] = '50% 50%'),
              (Ct.style[zt] = 'scaleX(0.5)'),
              (Mt = Dt === Ct.getBoundingClientRect().width && !(c && Xt)),
              Yt.removeChild(At)),
            Mt),
          Ut = function(t, e, i, s, r, n) {
            var o,
              l,
              h,
              _,
              u,
              f,
              c,
              p,
              d,
              m,
              g,
              y,
              v,
              T,
              x = t._gsTransform,
              b = Gt(t, !0);
            x && ((v = x.xOrigin), (T = x.yOrigin)),
              (!s || (o = s.split(' ')).length < 2) &&
                (0 === (c = t.getBBox()).x &&
                  0 === c.y &&
                  c.width + c.height === 0 &&
                  (c = {
                    x:
                      parseFloat(
                        t.hasAttribute('x')
                          ? t.getAttribute('x')
                          : t.hasAttribute('cx')
                          ? t.getAttribute('cx')
                          : 0
                      ) || 0,
                    y:
                      parseFloat(
                        t.hasAttribute('y')
                          ? t.getAttribute('y')
                          : t.hasAttribute('cy')
                          ? t.getAttribute('cy')
                          : 0
                      ) || 0,
                    width: 0,
                    height: 0
                  }),
                (o = [
                  (-1 !== (e = ht(e).split(' '))[0].indexOf('%')
                    ? (parseFloat(e[0]) / 100) * c.width
                    : parseFloat(e[0])) + c.x,
                  (-1 !== e[1].indexOf('%')
                    ? (parseFloat(e[1]) / 100) * c.height
                    : parseFloat(e[1])) + c.y
                ])),
              (i.xOrigin = _ = parseFloat(o[0])),
              (i.yOrigin = u = parseFloat(o[1])),
              s &&
                b !== Wt &&
                ((f = b[0]),
                (c = b[1]),
                (p = b[2]),
                (d = b[3]),
                (m = b[4]),
                (g = b[5]),
                (y = f * d - c * p) &&
                  ((l = _ * (d / y) + u * (-p / y) + (p * g - d * m) / y),
                  (h = _ * (-c / y) + u * (f / y) - (f * g - c * m) / y),
                  (_ = i.xOrigin = o[0] = l),
                  (u = i.yOrigin = o[1] = h))),
              x &&
                (n &&
                  ((i.xOffset = x.xOffset), (i.yOffset = x.yOffset), (x = i)),
                r || (!1 !== r && !1 !== a.defaultSmoothOrigin)
                  ? ((l = _ - v),
                    (h = u - T),
                    (x.xOffset += l * b[0] + h * b[2] - l),
                    (x.yOffset += l * b[1] + h * b[3] - h))
                  : (x.xOffset = x.yOffset = 0)),
              n || t.setAttribute('data-svg-origin', o.join(' '));
          },
          Vt = function(t) {
            var e,
              i = U(
                'svg',
                (this.ownerSVGElement &&
                  this.ownerSVGElement.getAttribute('xmlns')) ||
                  'http://www.w3.org/2000/svg'
              ),
              s = this.parentNode,
              r = this.nextSibling,
              n = this.style.cssText;
            if (
              (Yt.appendChild(i),
              i.appendChild(this),
              (this.style.display = 'block'),
              t)
            )
              try {
                (e = this.getBBox()),
                  (this._originalGetBBox = this.getBBox),
                  (this.getBBox = Vt);
              } catch (t) {}
            else this._originalGetBBox && (e = this._originalGetBBox());
            return (
              r ? s.insertBefore(this, r) : s.appendChild(this),
              Yt.removeChild(i),
              (this.style.cssText = n),
              e
            );
          },
          qt = function(t) {
            return !(
              !Lt ||
              !t.getCTM ||
              (t.parentNode && !t.ownerSVGElement) ||
              !(function(t) {
                try {
                  return t.getBBox();
                } catch (e) {
                  return Vt.call(t, !0);
                }
              })(t)
            );
          },
          Wt = [1, 0, 0, 1, 0, 0],
          Gt = function(t, e) {
            var i,
              s,
              r,
              n,
              a,
              o,
              l = t._gsTransform || new Nt(),
              h = t.style;
            if (
              (zt
                ? (s = et(t, Et, null, !0))
                : t.currentStyle &&
                  (s =
                    (s = t.currentStyle.filter.match(z)) && 4 === s.length
                      ? [
                          s[0].substr(4),
                          Number(s[2].substr(4)),
                          Number(s[1].substr(4)),
                          s[3].substr(4),
                          l.x || 0,
                          l.y || 0
                        ].join(',')
                      : ''),
              (i = !s || 'none' === s || 'matrix(1, 0, 0, 1, 0, 0)' === s),
              !zt ||
                (!(o = !tt(t) || 'none' === tt(t).display) && t.parentNode) ||
                (o && ((n = h.display), (h.display = 'block')),
                t.parentNode || ((a = 1), Yt.appendChild(t)),
                (i =
                  !(s = et(t, Et, null, !0)) ||
                  'none' === s ||
                  'matrix(1, 0, 0, 1, 0, 0)' === s),
                n ? (h.display = n) : o && Kt(h, 'display'),
                a && Yt.removeChild(t)),
              (l.svg || (t.getCTM && qt(t))) &&
                (i &&
                  -1 !== (h[zt] + '').indexOf('matrix') &&
                  ((s = h[zt]), (i = 0)),
                (r = t.getAttribute('transform')),
                i &&
                  r &&
                  (-1 !== r.indexOf('matrix')
                    ? ((s = r), (i = 0))
                    : -1 !== r.indexOf('translate') &&
                      ((s =
                        'matrix(1,0,0,1,' +
                        r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(',') +
                        ')'),
                      (i = 0)))),
              i)
            )
              return Wt;
            for (r = (s || '').match(T) || [], Pt = r.length; --Pt > -1; )
              (n = Number(r[Pt])),
                (r[Pt] = (a = n - (n |= 0))
                  ? ((1e5 * a + (0 > a ? -0.5 : 0.5)) | 0) / 1e5 + n
                  : n);
            return e && r.length > 6
              ? [r[0], r[1], r[4], r[5], r[12], r[13]]
              : r;
          },
          Zt = (W.getTransform = function(t, i, s, r) {
            if (t._gsTransform && s && !r) return t._gsTransform;
            var n,
              o,
              l,
              h,
              _,
              u,
              f = (s && t._gsTransform) || new Nt(),
              c = f.scaleX < 0,
              p =
                (Xt &&
                  (parseFloat(et(t, It, i, !1, '0 0 0').split(' ')[2]) ||
                    f.zOrigin)) ||
                0,
              d = parseFloat(a.defaultTransformPerspective) || 0;
            if (
              ((f.svg = !(!t.getCTM || !qt(t))),
              f.svg &&
                (Ut(
                  t,
                  et(t, It, i, !1, '50% 50%') + '',
                  f,
                  t.getAttribute('data-svg-origin')
                ),
                (Rt = a.useSVGTransformAttr || jt)),
              (n = Gt(t)) !== Wt)
            ) {
              if (16 === n.length) {
                var m,
                  g,
                  y,
                  v,
                  T,
                  x = n[0],
                  b = n[1],
                  w = n[2],
                  P = n[3],
                  O = n[4],
                  S = n[5],
                  k = n[6],
                  R = n[7],
                  A = n[8],
                  C = n[9],
                  D = n[10],
                  M = n[12],
                  F = n[13],
                  z = n[14],
                  E = n[11],
                  I = Math.atan2(k, D);
                f.zOrigin &&
                  ((M = A * (z = -f.zOrigin) - n[12]),
                  (F = C * z - n[13]),
                  (z = D * z + f.zOrigin - n[14])),
                  (f.rotationX = I * L),
                  I &&
                    ((m = O * (v = Math.cos(-I)) + A * (T = Math.sin(-I))),
                    (g = S * v + C * T),
                    (y = k * v + D * T),
                    (A = O * -T + A * v),
                    (C = S * -T + C * v),
                    (D = k * -T + D * v),
                    (E = R * -T + E * v),
                    (O = m),
                    (S = g),
                    (k = y)),
                  (I = Math.atan2(-w, D)),
                  (f.rotationY = I * L),
                  I &&
                    ((g = b * (v = Math.cos(-I)) - C * (T = Math.sin(-I))),
                    (y = w * v - D * T),
                    (C = b * T + C * v),
                    (D = w * T + D * v),
                    (E = P * T + E * v),
                    (x = m = x * v - A * T),
                    (b = g),
                    (w = y)),
                  (I = Math.atan2(b, x)),
                  (f.rotation = I * L),
                  I &&
                    ((m = x * (v = Math.cos(I)) + b * (T = Math.sin(I))),
                    (g = O * v + S * T),
                    (y = A * v + C * T),
                    (b = b * v - x * T),
                    (S = S * v - O * T),
                    (C = C * v - A * T),
                    (x = m),
                    (O = g),
                    (A = y)),
                  f.rotationX &&
                    Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 &&
                    ((f.rotationX = f.rotation = 0),
                    (f.rotationY = 180 - f.rotationY)),
                  (I = Math.atan2(O, S)),
                  (f.scaleX =
                    ((1e5 * Math.sqrt(x * x + b * b + w * w) + 0.5) | 0) / 1e5),
                  (f.scaleY =
                    ((1e5 * Math.sqrt(S * S + k * k) + 0.5) | 0) / 1e5),
                  (f.scaleZ =
                    ((1e5 * Math.sqrt(A * A + C * C + D * D) + 0.5) | 0) / 1e5),
                  (x /= f.scaleX),
                  (O /= f.scaleY),
                  (b /= f.scaleX),
                  (S /= f.scaleY),
                  Math.abs(I) > 2e-5
                    ? ((f.skewX = I * L),
                      (O = 0),
                      'simple' !== f.skewType && (f.scaleY *= 1 / Math.cos(I)))
                    : (f.skewX = 0),
                  (f.perspective = E ? 1 / (0 > E ? -E : E) : 0),
                  (f.x = M),
                  (f.y = F),
                  (f.z = z),
                  f.svg &&
                    ((f.x -= f.xOrigin - (f.xOrigin * x - f.yOrigin * O)),
                    (f.y -= f.yOrigin - (f.yOrigin * b - f.xOrigin * S)));
              } else if (
                !Xt ||
                r ||
                !n.length ||
                f.x !== n[4] ||
                f.y !== n[5] ||
                (!f.rotationX && !f.rotationY)
              ) {
                var X = n.length >= 6,
                  N = X ? n[0] : 1,
                  B = n[1] || 0,
                  Y = n[2] || 0,
                  j = X ? n[3] : 1;
                (f.x = n[4] || 0),
                  (f.y = n[5] || 0),
                  (l = Math.sqrt(N * N + B * B)),
                  (h = Math.sqrt(j * j + Y * Y)),
                  (_ = N || B ? Math.atan2(B, N) * L : f.rotation || 0),
                  (u = Y || j ? Math.atan2(Y, j) * L + _ : f.skewX || 0),
                  (f.scaleX = l),
                  (f.scaleY = h),
                  (f.rotation = _),
                  (f.skewX = u),
                  Xt &&
                    ((f.rotationX = f.rotationY = f.z = 0),
                    (f.perspective = d),
                    (f.scaleZ = 1)),
                  f.svg &&
                    ((f.x -= f.xOrigin - (f.xOrigin * N + f.yOrigin * Y)),
                    (f.y -= f.yOrigin - (f.xOrigin * B + f.yOrigin * j)));
              }
              Math.abs(f.skewX) > 90 &&
                Math.abs(f.skewX) < 270 &&
                (c
                  ? ((f.scaleX *= -1),
                    (f.skewX += f.rotation <= 0 ? 180 : -180),
                    (f.rotation += f.rotation <= 0 ? 180 : -180))
                  : ((f.scaleY *= -1), (f.skewX += f.skewX <= 0 ? 180 : -180))),
                (f.zOrigin = p);
              for (o in f) f[o] < 2e-5 && f[o] > -2e-5 && (f[o] = 0);
            }
            return (
              s &&
                ((t._gsTransform = f),
                f.svg &&
                  (Rt && t.style[zt]
                    ? e.delayedCall(0.001, function() {
                        Kt(t.style, zt);
                      })
                    : !Rt &&
                      t.getAttribute('transform') &&
                      e.delayedCall(0.001, function() {
                        t.removeAttribute('transform');
                      }))),
              f
            );
          }),
          Ht = function(t) {
            var e,
              i,
              s = this.data,
              r = -s.rotation * N,
              n = r + s.skewX * N,
              a = 1e5,
              o = ((Math.cos(r) * s.scaleX * a) | 0) / a,
              l = ((Math.sin(r) * s.scaleX * a) | 0) / a,
              h = ((Math.sin(n) * -s.scaleY * a) | 0) / a,
              _ = ((Math.cos(n) * s.scaleY * a) | 0) / a,
              u = this.t.style,
              f = this.t.currentStyle;
            if (f) {
              (i = l), (l = -h), (h = -i), (e = f.filter), (u.filter = '');
              var c,
                p,
                m = this.t.offsetWidth,
                g = this.t.offsetHeight,
                y = 'absolute' !== f.position,
                v =
                  'progid:DXImageTransform.Microsoft.Matrix(M11=' +
                  o +
                  ', M12=' +
                  l +
                  ', M21=' +
                  h +
                  ', M22=' +
                  _,
                T = s.x + (m * s.xPercent) / 100,
                x = s.y + (g * s.yPercent) / 100;
              if (
                (null != s.ox &&
                  ((T +=
                    (c = (s.oxp ? m * s.ox * 0.01 : s.ox) - m / 2) -
                    (c * o +
                      (p = (s.oyp ? g * s.oy * 0.01 : s.oy) - g / 2) * l)),
                  (x += p - (c * h + p * _))),
                y
                  ? (v +=
                      ', Dx=' +
                      ((c = m / 2) - (c * o + (p = g / 2) * l) + T) +
                      ', Dy=' +
                      (p - (c * h + p * _) + x) +
                      ')')
                  : (v += ", sizingMethod='auto expand')"),
                -1 !== e.indexOf('DXImageTransform.Microsoft.Matrix(')
                  ? (u.filter = e.replace(E, v))
                  : (u.filter = v + ' ' + e),
                (0 === t || 1 === t) &&
                  1 === o &&
                  0 === l &&
                  0 === h &&
                  1 === _ &&
                  ((y && -1 === v.indexOf('Dx=0, Dy=0')) ||
                    (O.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === e.indexOf(e.indexOf('Alpha')) &&
                      u.removeAttribute('filter'))),
                !y)
              ) {
                var b,
                  w,
                  S,
                  k = 8 > d ? 1 : -1;
                for (
                  c = s.ieOffsetX || 0,
                    p = s.ieOffsetY || 0,
                    s.ieOffsetX = Math.round(
                      (m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 +
                        T
                    ),
                    s.ieOffsetY = Math.round(
                      (g - ((0 > _ ? -_ : _) * g + (0 > h ? -h : h) * m)) / 2 +
                        x
                    ),
                    Pt = 0;
                  4 > Pt;
                  Pt++
                )
                  (w = ot[Pt]),
                    (b = f[w]),
                    (i =
                      -1 !== b.indexOf('px')
                        ? parseFloat(b)
                        : it(this.t, w, parseFloat(b), b.replace(P, '')) || 0),
                    (S =
                      i !== s[w]
                        ? 2 > Pt
                          ? -s.ieOffsetX
                          : -s.ieOffsetY
                        : 2 > Pt
                        ? c - s.ieOffsetX
                        : p - s.ieOffsetY),
                    (u[w] =
                      (s[w] = Math.round(
                        i - S * (0 === Pt || 2 === Pt ? 1 : k)
                      )) + 'px');
              }
            }
          },
          $t = (W.set3DTransformRatio = W.setTransformRatio = function(t) {
            var e,
              i,
              s,
              r,
              n,
              a,
              o,
              l,
              h,
              _,
              u,
              f,
              p,
              d,
              m,
              g,
              y,
              v,
              T,
              x,
              b,
              w,
              P,
              O = this.data,
              S = this.t.style,
              k = O.rotation,
              R = O.rotationX,
              A = O.rotationY,
              C = O.scaleX,
              D = O.scaleY,
              M = O.scaleZ,
              F = O.x,
              z = O.y,
              E = O.z,
              I = O.svg,
              X = O.perspective,
              L = O.force3D,
              B = O.skewY,
              Y = O.skewX;
            if (
              (B && ((Y += B), (k += B)),
              !(
                (((1 !== t && 0 !== t) ||
                  'auto' !== L ||
                  (this.tween._totalTime !== this.tween._totalDuration &&
                    this.tween._totalTime)) &&
                  L) ||
                E ||
                X ||
                A ||
                R ||
                1 !== M
              ) ||
                (Rt && I) ||
                !Xt)
            )
              k || Y || I
                ? ((k *= N),
                  (w = Y * N),
                  (P = 1e5),
                  (i = Math.cos(k) * C),
                  (n = Math.sin(k) * C),
                  (s = Math.sin(k - w) * -D),
                  (a = Math.cos(k - w) * D),
                  w &&
                    'simple' === O.skewType &&
                    ((e = Math.tan(w - B * N)),
                    (s *= e = Math.sqrt(1 + e * e)),
                    (a *= e),
                    B &&
                      ((e = Math.tan(B * N)),
                      (i *= e = Math.sqrt(1 + e * e)),
                      (n *= e))),
                  I &&
                    ((F +=
                      O.xOrigin - (O.xOrigin * i + O.yOrigin * s) + O.xOffset),
                    (z +=
                      O.yOrigin - (O.xOrigin * n + O.yOrigin * a) + O.yOffset),
                    Rt &&
                      (O.xPercent || O.yPercent) &&
                      ((m = this.t.getBBox()),
                      (F += 0.01 * O.xPercent * m.width),
                      (z += 0.01 * O.yPercent * m.height)),
                    (m = 1e-6) > F && F > -m && (F = 0),
                    m > z && z > -m && (z = 0)),
                  (T =
                    ((i * P) | 0) / P +
                    ',' +
                    ((n * P) | 0) / P +
                    ',' +
                    ((s * P) | 0) / P +
                    ',' +
                    ((a * P) | 0) / P +
                    ',' +
                    F +
                    ',' +
                    z +
                    ')'),
                  I && Rt
                    ? this.t.setAttribute('transform', 'matrix(' + T)
                    : (S[zt] =
                        (O.xPercent || O.yPercent
                          ? 'translate(' +
                            O.xPercent +
                            '%,' +
                            O.yPercent +
                            '%) matrix('
                          : 'matrix(') + T))
                : (S[zt] =
                    (O.xPercent || O.yPercent
                      ? 'translate(' +
                        O.xPercent +
                        '%,' +
                        O.yPercent +
                        '%) matrix('
                      : 'matrix(') +
                    C +
                    ',0,0,' +
                    D +
                    ',' +
                    F +
                    ',' +
                    z +
                    ')');
            else {
              if (
                (c &&
                  ((m = 1e-4) > C && C > -m && (C = M = 2e-5),
                  m > D && D > -m && (D = M = 2e-5),
                  !X || O.z || O.rotationX || O.rotationY || (X = 0)),
                k || Y)
              )
                (k *= N),
                  (g = i = Math.cos(k)),
                  (y = n = Math.sin(k)),
                  Y &&
                    ((k -= Y * N),
                    (g = Math.cos(k)),
                    (y = Math.sin(k)),
                    'simple' === O.skewType &&
                      ((e = Math.tan((Y - B) * N)),
                      (e = Math.sqrt(1 + e * e)),
                      (g *= e),
                      (y *= e),
                      O.skewY &&
                        ((e = Math.tan(B * N)),
                        (e = Math.sqrt(1 + e * e)),
                        (i *= e),
                        (n *= e)))),
                  (s = -y),
                  (a = g);
              else {
                if (!(A || R || 1 !== M || X || I))
                  return void (S[zt] =
                    (O.xPercent || O.yPercent
                      ? 'translate(' +
                        O.xPercent +
                        '%,' +
                        O.yPercent +
                        '%) translate3d('
                      : 'translate3d(') +
                    F +
                    'px,' +
                    z +
                    'px,' +
                    E +
                    'px)' +
                    (1 !== C || 1 !== D ? ' scale(' + C + ',' + D + ')' : ''));
                (i = a = 1), (s = n = 0);
              }
              (_ = 1),
                (r = o = l = h = u = f = 0),
                (p = X ? -1 / X : 0),
                (d = O.zOrigin),
                (m = 1e-6),
                (x = ','),
                (b = '0'),
                (k = A * N) &&
                  ((g = Math.cos(k)),
                  (l = -(y = Math.sin(k))),
                  (u = p * -y),
                  (r = i * y),
                  (o = n * y),
                  (_ = g),
                  (p *= g),
                  (i *= g),
                  (n *= g)),
                (k = R * N) &&
                  ((e = s * (g = Math.cos(k)) + r * (y = Math.sin(k))),
                  (v = a * g + o * y),
                  (h = _ * y),
                  (f = p * y),
                  (r = s * -y + r * g),
                  (o = a * -y + o * g),
                  (_ *= g),
                  (p *= g),
                  (s = e),
                  (a = v)),
                1 !== M && ((r *= M), (o *= M), (_ *= M), (p *= M)),
                1 !== D && ((s *= D), (a *= D), (h *= D), (f *= D)),
                1 !== C && ((i *= C), (n *= C), (l *= C), (u *= C)),
                (d || I) &&
                  (d && ((F += r * -d), (z += o * -d), (E += _ * -d + d)),
                  I &&
                    ((F +=
                      O.xOrigin - (O.xOrigin * i + O.yOrigin * s) + O.xOffset),
                    (z +=
                      O.yOrigin - (O.xOrigin * n + O.yOrigin * a) + O.yOffset)),
                  m > F && F > -m && (F = b),
                  m > z && z > -m && (z = b),
                  m > E && E > -m && (E = 0)),
                (T =
                  O.xPercent || O.yPercent
                    ? 'translate(' +
                      O.xPercent +
                      '%,' +
                      O.yPercent +
                      '%) matrix3d('
                    : 'matrix3d('),
                (T +=
                  (m > i && i > -m ? b : i) +
                  x +
                  (m > n && n > -m ? b : n) +
                  x +
                  (m > l && l > -m ? b : l)),
                (T +=
                  x +
                  (m > u && u > -m ? b : u) +
                  x +
                  (m > s && s > -m ? b : s) +
                  x +
                  (m > a && a > -m ? b : a)),
                R || A || 1 !== M
                  ? ((T +=
                      x +
                      (m > h && h > -m ? b : h) +
                      x +
                      (m > f && f > -m ? b : f) +
                      x +
                      (m > r && r > -m ? b : r)),
                    (T +=
                      x +
                      (m > o && o > -m ? b : o) +
                      x +
                      (m > _ && _ > -m ? b : _) +
                      x +
                      (m > p && p > -m ? b : p) +
                      x))
                  : (T += ',0,0,0,0,1,0,'),
                (T += F + x + z + x + E + x + (X ? 1 + -E / X : 1) + ')'),
                (S[zt] = T);
            }
          });
        ((h =
          Nt.prototype).x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0),
          (h.scaleX = h.scaleY = h.scaleZ = 1),
          St(
            'transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin',
            {
              parser: function(t, e, i, s, n, o, l) {
                if (s._lastParsedTransform === l) return n;
                s._lastParsedTransform = l;
                var h,
                  _ = l.scale && 'function' == typeof l.scale ? l.scale : 0;
                'function' == typeof l[i] && ((h = l[i]), (l[i] = e)),
                  _ && (l.scale = _(g, t));
                var u,
                  f,
                  c,
                  p,
                  d,
                  y,
                  v,
                  T,
                  x,
                  b = t._gsTransform,
                  w = t.style,
                  P = Ft.length,
                  O = l,
                  S = {},
                  k = 'transformOrigin',
                  R = Zt(t, r, !0, O.parseTransform),
                  A =
                    O.transform &&
                    ('function' == typeof O.transform
                      ? O.transform(g, m)
                      : O.transform);
                if (
                  ((R.skewType = O.skewType || R.skewType || a.defaultSkewType),
                  (s._transform = R),
                  A && 'string' == typeof A && zt)
                )
                  (f = V.style),
                    (f[zt] = A),
                    (f.display = 'block'),
                    (f.position = 'absolute'),
                    j.body.appendChild(V),
                    (u = Zt(V, null, !1)),
                    'simple' === R.skewType &&
                      (u.scaleY *= Math.cos(u.skewX * N)),
                    R.svg &&
                      ((y = R.xOrigin),
                      (v = R.yOrigin),
                      (u.x -= R.xOffset),
                      (u.y -= R.yOffset),
                      (O.transformOrigin || O.svgOrigin) &&
                        ((A = {}),
                        Ut(
                          t,
                          ht(O.transformOrigin),
                          A,
                          O.svgOrigin,
                          O.smoothOrigin,
                          !0
                        ),
                        (y = A.xOrigin),
                        (v = A.yOrigin),
                        (u.x -= A.xOffset - R.xOffset),
                        (u.y -= A.yOffset - R.yOffset)),
                      (y || v) &&
                        ((T = Gt(V, !0)),
                        (u.x -= y - (y * T[0] + v * T[2])),
                        (u.y -= v - (y * T[1] + v * T[3])))),
                    j.body.removeChild(V),
                    u.perspective || (u.perspective = R.perspective),
                    null != O.xPercent &&
                      (u.xPercent = ut(O.xPercent, R.xPercent)),
                    null != O.yPercent &&
                      (u.yPercent = ut(O.yPercent, R.yPercent));
                else if ('object' == typeof O) {
                  if (
                    ((u = {
                      scaleX: ut(
                        null != O.scaleX ? O.scaleX : O.scale,
                        R.scaleX
                      ),
                      scaleY: ut(
                        null != O.scaleY ? O.scaleY : O.scale,
                        R.scaleY
                      ),
                      scaleZ: ut(O.scaleZ, R.scaleZ),
                      x: ut(O.x, R.x),
                      y: ut(O.y, R.y),
                      z: ut(O.z, R.z),
                      xPercent: ut(O.xPercent, R.xPercent),
                      yPercent: ut(O.yPercent, R.yPercent),
                      perspective: ut(O.transformPerspective, R.perspective)
                    }),
                    null != (d = O.directionalRotation))
                  )
                    if ('object' == typeof d) for (f in d) O[f] = d[f];
                    else O.rotation = d;
                  'string' == typeof O.x &&
                    -1 !== O.x.indexOf('%') &&
                    ((u.x = 0), (u.xPercent = ut(O.x, R.xPercent))),
                    'string' == typeof O.y &&
                      -1 !== O.y.indexOf('%') &&
                      ((u.y = 0), (u.yPercent = ut(O.y, R.yPercent))),
                    (u.rotation = ft(
                      'rotation' in O
                        ? O.rotation
                        : 'shortRotation' in O
                        ? O.shortRotation + '_short'
                        : 'rotationZ' in O
                        ? O.rotationZ
                        : R.rotation,
                      R.rotation,
                      'rotation',
                      S
                    )),
                    Xt &&
                      ((u.rotationX = ft(
                        'rotationX' in O
                          ? O.rotationX
                          : 'shortRotationX' in O
                          ? O.shortRotationX + '_short'
                          : R.rotationX || 0,
                        R.rotationX,
                        'rotationX',
                        S
                      )),
                      (u.rotationY = ft(
                        'rotationY' in O
                          ? O.rotationY
                          : 'shortRotationY' in O
                          ? O.shortRotationY + '_short'
                          : R.rotationY || 0,
                        R.rotationY,
                        'rotationY',
                        S
                      ))),
                    (u.skewX = ft(O.skewX, R.skewX)),
                    (u.skewY = ft(O.skewY, R.skewY));
                }
                for (
                  Xt &&
                    null != O.force3D &&
                    ((R.force3D = O.force3D), (p = !0)),
                    (c =
                      R.force3D ||
                      R.z ||
                      R.rotationX ||
                      R.rotationY ||
                      u.z ||
                      u.rotationX ||
                      u.rotationY ||
                      u.perspective) ||
                      null == O.scale ||
                      (u.scaleZ = 1);
                  --P > -1;

                )
                  (x = Ft[P]),
                    (A = u[x] - R[x]),
                    (A > 1e-6 || -1e-6 > A || null != O[x] || null != B[x]) &&
                      ((p = !0),
                      (n = new xt(R, x, R[x], A, n)),
                      x in S && (n.e = S[x]),
                      (n.xs0 = 0),
                      (n.plugin = o),
                      s._overwriteProps.push(n.n));
                return (
                  (A = O.transformOrigin),
                  R.svg &&
                    (A || O.svgOrigin) &&
                    ((y = R.xOffset),
                    (v = R.yOffset),
                    Ut(t, ht(A), u, O.svgOrigin, O.smoothOrigin),
                    (n = bt(
                      R,
                      'xOrigin',
                      (b ? R : u).xOrigin,
                      u.xOrigin,
                      n,
                      k
                    )),
                    (n = bt(
                      R,
                      'yOrigin',
                      (b ? R : u).yOrigin,
                      u.yOrigin,
                      n,
                      k
                    )),
                    (y !== R.xOffset || v !== R.yOffset) &&
                      ((n = bt(
                        R,
                        'xOffset',
                        b ? y : R.xOffset,
                        R.xOffset,
                        n,
                        k
                      )),
                      (n = bt(
                        R,
                        'yOffset',
                        b ? v : R.yOffset,
                        R.yOffset,
                        n,
                        k
                      ))),
                    (A = '0px 0px')),
                  (A || (Xt && c && R.zOrigin)) &&
                    (zt
                      ? ((p = !0),
                        (x = It),
                        (A = (A || et(t, x, r, !1, '50% 50%')) + ''),
                        ((n = new xt(w, x, 0, 0, n, -1, k)).b = w[x]),
                        (n.plugin = o),
                        Xt
                          ? ((f = R.zOrigin),
                            (A = A.split(' ')),
                            (R.zOrigin =
                              (A.length > 2 && (0 === f || '0px' !== A[2])
                                ? parseFloat(A[2])
                                : f) || 0),
                            (n.xs0 = n.e =
                              A[0] + ' ' + (A[1] || '50%') + ' 0px'),
                            ((n = new xt(
                              R,
                              'zOrigin',
                              0,
                              0,
                              n,
                              -1,
                              n.n
                            )).b = f),
                            (n.xs0 = n.e = R.zOrigin))
                          : (n.xs0 = n.e = A))
                      : ht(A + '', R)),
                  p &&
                    (s._transformType =
                      (R.svg && Rt) || (!c && 3 !== this._transformType)
                        ? 2
                        : 3),
                  h && (l[i] = h),
                  _ && (l.scale = _),
                  n
                );
              },
              prefix: !0
            }
          ),
          St('boxShadow', {
            defaultValue: '0px 0px 0px 0px #999',
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: 'inset'
          }),
          St('borderRadius', {
            defaultValue: '0px',
            parser: function(t, e, i, n, a, o) {
              e = this.format(e);
              var l,
                h,
                _,
                u,
                f,
                c,
                p,
                d,
                m,
                g,
                y,
                v,
                T,
                x,
                b,
                w,
                P = [
                  'borderTopLeftRadius',
                  'borderTopRightRadius',
                  'borderBottomRightRadius',
                  'borderBottomLeftRadius'
                ],
                O = t.style;
              for (
                m = parseFloat(t.offsetWidth),
                  g = parseFloat(t.offsetHeight),
                  l = e.split(' '),
                  h = 0;
                h < P.length;
                h++
              )
                this.p.indexOf('border') && (P[h] = J(P[h])),
                  (f = u = et(t, P[h], r, !1, '0px')),
                  -1 !== f.indexOf(' ') &&
                    ((u = f.split(' ')), (f = u[0]), (u = u[1])),
                  (c = _ = l[h]),
                  (p = parseFloat(f)),
                  (v = f.substr((p + '').length)),
                  (T = '=' === c.charAt(1)),
                  T
                    ? ((d = parseInt(c.charAt(0) + '1', 10)),
                      (c = c.substr(2)),
                      (d *= parseFloat(c)),
                      (y = c.substr((d + '').length - (0 > d ? 1 : 0)) || ''))
                    : ((d = parseFloat(c)), (y = c.substr((d + '').length))),
                  '' === y && (y = s[i] || v),
                  y !== v &&
                    ((x = it(t, 'borderLeft', p, v)),
                    (b = it(t, 'borderTop', p, v)),
                    '%' === y
                      ? ((f = (x / m) * 100 + '%'), (u = (b / g) * 100 + '%'))
                      : 'em' === y
                      ? ((w = it(t, 'borderLeft', 1, 'em')),
                        (f = x / w + 'em'),
                        (u = b / w + 'em'))
                      : ((f = x + 'px'), (u = b + 'px')),
                    T &&
                      ((c = parseFloat(f) + d + y),
                      (_ = parseFloat(u) + d + y))),
                  (a = wt(O, P[h], f + ' ' + u, c + ' ' + _, !1, '0px', a));
              return a;
            },
            prefix: !0,
            formatter: yt('0px 0px 0px 0px', !1, !0)
          }),
          St(
            'borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius',
            {
              defaultValue: '0px',
              parser: function(t, e, i, s, n, a) {
                return wt(
                  t.style,
                  i,
                  this.format(et(t, i, r, !1, '0px 0px')),
                  this.format(e),
                  !1,
                  '0px',
                  n
                );
              },
              prefix: !0,
              formatter: yt('0px 0px', !1, !0)
            }
          ),
          St('backgroundPosition', {
            defaultValue: '0 0',
            parser: function(t, e, i, s, n, a) {
              var o,
                l,
                h,
                _,
                u,
                f,
                c = 'background-position',
                p = r || tt(t, null),
                m = this.format(
                  (p
                    ? d
                      ? p.getPropertyValue(c + '-x') +
                        ' ' +
                        p.getPropertyValue(c + '-y')
                      : p.getPropertyValue(c)
                    : t.currentStyle.backgroundPositionX +
                      ' ' +
                      t.currentStyle.backgroundPositionY) || '0 0'
                ),
                g = this.format(e);
              if (
                (-1 !== m.indexOf('%')) != (-1 !== g.indexOf('%')) &&
                g.split(',').length < 2 &&
                (f = et(t, 'backgroundImage').replace(D, '')) &&
                'none' !== f
              ) {
                for (
                  o = m.split(' '),
                    l = g.split(' '),
                    q.setAttribute('src', f),
                    h = 2;
                  --h > -1;

                )
                  (m = o[h]),
                    (_ = -1 !== m.indexOf('%')),
                    _ !== (-1 !== l[h].indexOf('%')) &&
                      ((u =
                        0 === h
                          ? t.offsetWidth - q.width
                          : t.offsetHeight - q.height),
                      (o[h] = _
                        ? (parseFloat(m) / 100) * u + 'px'
                        : (parseFloat(m) / u) * 100 + '%'));
                m = o.join(' ');
              }
              return this.parseComplex(t.style, m, g, n, a);
            },
            formatter: ht
          }),
          St('backgroundSize', {
            defaultValue: '0 0',
            formatter: function(t) {
              return ht(-1 === (t += '').indexOf(' ') ? t + ' ' + t : t);
            }
          }),
          St('perspective', { defaultValue: '0px', prefix: !0 }),
          St('perspectiveOrigin', { defaultValue: '50% 50%', prefix: !0 }),
          St('transformStyle', { prefix: !0 }),
          St('backfaceVisibility', { prefix: !0 }),
          St('userSelect', { prefix: !0 }),
          St('margin', {
            parser: vt('marginTop,marginRight,marginBottom,marginLeft')
          }),
          St('padding', {
            parser: vt('paddingTop,paddingRight,paddingBottom,paddingLeft')
          }),
          St('clip', {
            defaultValue: 'rect(0px,0px,0px,0px)',
            parser: function(t, e, i, s, n, a) {
              var o, l, h;
              return (
                9 > d
                  ? ((l = t.currentStyle),
                    (h = 8 > d ? ' ' : ','),
                    (o =
                      'rect(' +
                      l.clipTop +
                      h +
                      l.clipRight +
                      h +
                      l.clipBottom +
                      h +
                      l.clipLeft +
                      ')'),
                    (e = this.format(e)
                      .split(',')
                      .join(h)))
                  : ((o = this.format(et(t, this.p, r, !1, this.dflt))),
                    (e = this.format(e))),
                this.parseComplex(t.style, o, e, n, a)
              );
            }
          }),
          St('textShadow', {
            defaultValue: '0px 0px 0px #999',
            color: !0,
            multi: !0
          }),
          St('autoRound,strictUnits', {
            parser: function(t, e, i, s, r) {
              return r;
            }
          }),
          St('border', {
            defaultValue: '0px solid #000',
            parser: function(t, e, i, s, n, a) {
              var o = et(t, 'borderTopWidth', r, !1, '0px'),
                l = this.format(e).split(' '),
                h = l[0].replace(P, '');
              return (
                'px' !== h &&
                  (o = parseFloat(o) / it(t, 'borderTopWidth', 1, h) + h),
                this.parseComplex(
                  t.style,
                  this.format(
                    o +
                      ' ' +
                      et(t, 'borderTopStyle', r, !1, 'solid') +
                      ' ' +
                      et(t, 'borderTopColor', r, !1, '#000')
                  ),
                  l.join(' '),
                  n,
                  a
                )
              );
            },
            color: !0,
            formatter: function(t) {
              var e = t.split(' ');
              return (
                e[0] +
                ' ' +
                (e[1] || 'solid') +
                ' ' +
                (t.match(gt) || ['#000'])[0]
              );
            }
          }),
          St('borderWidth', {
            parser: vt(
              'borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth'
            )
          }),
          St('float,cssFloat,styleFloat', {
            parser: function(t, e, i, s, r, n) {
              var a = t.style,
                o = 'cssFloat' in a ? 'cssFloat' : 'styleFloat';
              return new xt(a, o, 0, 0, r, -1, i, !1, 0, a[o], e);
            }
          });
        var Qt = function(t) {
          var e,
            i = this.t,
            s = i.filter || et(this.data, 'filter') || '',
            r = (this.s + this.c * t) | 0;
          100 === r &&
            (-1 === s.indexOf('atrix(') &&
            -1 === s.indexOf('radient(') &&
            -1 === s.indexOf('oader(')
              ? (i.removeAttribute('filter'), (e = !et(this.data, 'filter')))
              : ((i.filter = s.replace(k, '')), (e = !0))),
            e ||
              (this.xn1 && (i.filter = s = s || 'alpha(opacity=' + r + ')'),
              -1 === s.indexOf('pacity')
                ? (0 === r && this.xn1) ||
                  (i.filter = s + ' alpha(opacity=' + r + ')')
                : (i.filter = s.replace(O, 'opacity=' + r)));
        };
        St('opacity,alpha,autoAlpha', {
          defaultValue: '1',
          parser: function(t, e, i, s, n, a) {
            var o = parseFloat(et(t, 'opacity', r, !1, '1')),
              l = t.style,
              h = 'autoAlpha' === i;
            return (
              'string' == typeof e &&
                '=' === e.charAt(1) &&
                (e =
                  ('-' === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o),
              h &&
                1 === o &&
                'hidden' === et(t, 'visibility', r) &&
                0 !== e &&
                (o = 0),
              Z
                ? (n = new xt(l, 'opacity', o, e - o, n))
                : (((n = new xt(
                    l,
                    'opacity',
                    100 * o,
                    100 * (e - o),
                    n
                  )).xn1 = h ? 1 : 0),
                  (l.zoom = 1),
                  (n.type = 2),
                  (n.b = 'alpha(opacity=' + n.s + ')'),
                  (n.e = 'alpha(opacity=' + (n.s + n.c) + ')'),
                  (n.data = t),
                  (n.plugin = a),
                  (n.setRatio = Qt)),
              h &&
                (((n = new xt(
                  l,
                  'visibility',
                  0,
                  0,
                  n,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== o ? 'inherit' : 'hidden',
                  0 === e ? 'hidden' : 'inherit'
                )).xs0 = 'inherit'),
                s._overwriteProps.push(n.n),
                s._overwriteProps.push(i)),
              n
            );
          }
        });
        var Kt = function(t, e) {
            e &&
              (t.removeProperty
                ? (('ms' === e.substr(0, 2) || 'webkit' === e.substr(0, 6)) &&
                    (e = '-' + e),
                  t.removeProperty(e.replace(A, '-$1').toLowerCase()))
                : t.removeAttribute(e));
          },
          Jt = function(t) {
            if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
              this.t.setAttribute('class', 0 === t ? this.b : this.e);
              for (var e = this.data, i = this.t.style; e; )
                e.v ? (i[e.p] = e.v) : Kt(i, e.p), (e = e._next);
              1 === t &&
                this.t._gsClassPT === this &&
                (this.t._gsClassPT = null);
            } else
              this.t.getAttribute('class') !== this.e &&
                this.t.setAttribute('class', this.e);
          };
        St('className', {
          parser: function(t, e, s, n, a, o, l) {
            var h,
              _,
              u,
              f,
              c,
              p = t.getAttribute('class') || '',
              d = t.style.cssText;
            if (
              (((a = n._classNamePT = new xt(t, s, 0, 0, a, 2)).setRatio = Jt),
              (a.pr = -11),
              (i = !0),
              (a.b = p),
              (_ = rt(t, r)),
              (u = t._gsClassPT))
            ) {
              for (f = {}, c = u.data; c; ) (f[c.p] = 1), (c = c._next);
              u.setRatio(1);
            }
            return (
              (t._gsClassPT = a),
              (a.e =
                '=' !== e.charAt(1)
                  ? e
                  : p.replace(
                      new RegExp('(?:\\s|^)' + e.substr(2) + '(?![\\w-])'),
                      ''
                    ) + ('+' === e.charAt(0) ? ' ' + e.substr(2) : '')),
              t.setAttribute('class', a.e),
              (h = nt(t, _, rt(t), l, f)),
              t.setAttribute('class', p),
              (a.data = h.firstMPT),
              (t.style.cssText = d),
              (a.xfirst = n.parse(t, h.difs, a, o))
            );
          }
        });
        var te = function(t) {
          if (
            (1 === t || 0 === t) &&
            this.data._totalTime === this.data._totalDuration &&
            'isFromStart' !== this.data.data
          ) {
            var e,
              i,
              s,
              r,
              n,
              a = this.t.style,
              o = l.transform.parse;
            if ('all' === this.e) (a.cssText = ''), (r = !0);
            else
              for (
                e = this.e
                  .split(' ')
                  .join('')
                  .split(','),
                  s = e.length;
                --s > -1;

              )
                (i = e[s]),
                  l[i] &&
                    (l[i].parse === o
                      ? (r = !0)
                      : (i = 'transformOrigin' === i ? It : l[i].p)),
                  Kt(a, i);
            r &&
              (Kt(a, zt),
              (n = this.t._gsTransform) &&
                (n.svg &&
                  (this.t.removeAttribute('data-svg-origin'),
                  this.t.removeAttribute('transform')),
                delete this.t._gsTransform));
          }
        };
        for (
          St('clearProps', {
            parser: function(t, e, s, r, n) {
              return (
                ((n = new xt(t, s, 0, 0, n, 2)).setRatio = te),
                (n.e = e),
                (n.pr = -10),
                (n.data = r._tween),
                (i = !0),
                n
              );
            }
          }),
            h = 'bezier,throwProps,physicsProps,physics2D'.split(','),
            Pt = h.length;
          Pt--;

        )
          kt(h[Pt]);
        ((h =
          a.prototype)._firstPT = h._lastParsedTransform = h._transform = null),
          (h._onInitTween = function(t, e, o, h) {
            if (!t.nodeType) return !1;
            (this._target = m = t),
              (this._tween = o),
              (this._vars = e),
              (g = h),
              (_ = e.autoRound),
              (i = !1),
              (s = e.suffixMap || a.suffixMap),
              (r = tt(t, '')),
              (n = this._overwriteProps);
            var c,
              d,
              y,
              v,
              T,
              x,
              b,
              w,
              P,
              O = t.style;
            if (
              (u &&
                '' === O.zIndex &&
                ('auto' === (c = et(t, 'zIndex', r)) || '' === c) &&
                this._addLazySet(O, 'zIndex', 0),
              'string' == typeof e &&
                ((v = O.cssText),
                (c = rt(t, r)),
                (O.cssText = v + ';' + e),
                (c = nt(t, c, rt(t)).difs),
                !Z && S.test(e) && (c.opacity = parseFloat(RegExp.$1)),
                (e = c),
                (O.cssText = v)),
              e.className
                ? (this._firstPT = d = l.className.parse(
                    t,
                    e.className,
                    'className',
                    this,
                    null,
                    null,
                    e
                  ))
                : (this._firstPT = d = this.parse(t, e, null)),
              this._transformType)
            ) {
              for (
                P = 3 === this._transformType,
                  zt
                    ? f &&
                      ((u = !0),
                      '' === O.zIndex &&
                        ('auto' === (b = et(t, 'zIndex', r)) || '' === b) &&
                        this._addLazySet(O, 'zIndex', 0),
                      p &&
                        this._addLazySet(
                          O,
                          'WebkitBackfaceVisibility',
                          this._vars.WebkitBackfaceVisibility ||
                            (P ? 'visible' : 'hidden')
                        ))
                    : (O.zoom = 1),
                  y = d;
                y && y._next;

              )
                y = y._next;
              (w = new xt(t, 'transform', 0, 0, null, 2)),
                this._linkCSSP(w, null, y),
                (w.setRatio = zt ? $t : Ht),
                (w.data = this._transform || Zt(t, r, !0)),
                (w.tween = o),
                (w.pr = -1),
                n.pop();
            }
            if (i) {
              for (; d; ) {
                for (x = d._next, y = v; y && y.pr > d.pr; ) y = y._next;
                (d._prev = y ? y._prev : T) ? (d._prev._next = d) : (v = d),
                  (d._next = y) ? (y._prev = d) : (T = d),
                  (d = x);
              }
              this._firstPT = v;
            }
            return !0;
          }),
          (h.parse = function(t, e, i, n) {
            var a,
              o,
              h,
              u,
              f,
              c,
              p,
              d,
              y,
              v,
              T = t.style;
            for (a in e) {
              if (
                ('function' == typeof (c = e[a]) && (c = c(g, m)), (o = l[a]))
              )
                i = o.parse(t, c, a, this, i, n, e);
              else {
                if ('--' === a.substr(0, 2)) {
                  this._tween._propLookup[a] = this._addTween.call(
                    this._tween,
                    t.style,
                    'setProperty',
                    tt(t).getPropertyValue(a) + '',
                    c + '',
                    a,
                    !1,
                    a
                  );
                  continue;
                }
                (f = et(t, a, r) + ''),
                  (y = 'string' == typeof c),
                  'color' === a ||
                  'fill' === a ||
                  'stroke' === a ||
                  -1 !== a.indexOf('Color') ||
                  (y && R.test(c))
                    ? (y ||
                        (c =
                          ((c = dt(c)).length > 3 ? 'rgba(' : 'rgb(') +
                          c.join(',') +
                          ')'),
                      (i = wt(T, a, f, c, !0, 'transparent', i, 0, n)))
                    : y && X.test(c)
                    ? (i = wt(T, a, f, c, !0, null, i, 0, n))
                    : ((p =
                        (h = parseFloat(f)) || 0 === h
                          ? f.substr((h + '').length)
                          : ''),
                      ('' === f || 'auto' === f) &&
                        ('width' === a || 'height' === a
                          ? ((h = lt(t, a, r)), (p = 'px'))
                          : 'left' === a || 'top' === a
                          ? ((h = st(t, a, r)), (p = 'px'))
                          : ((h = 'opacity' !== a ? 0 : 1), (p = ''))),
                      (v = y && '=' === c.charAt(1))
                        ? ((u = parseInt(c.charAt(0) + '1', 10)),
                          (c = c.substr(2)),
                          (u *= parseFloat(c)),
                          (d = c.replace(P, '')))
                        : ((u = parseFloat(c)),
                          (d = y ? c.replace(P, '') : '')),
                      '' === d && (d = a in s ? s[a] : p),
                      (c = u || 0 === u ? (v ? u + h : u) + d : e[a]),
                      p !== d &&
                        ('' !== d || 'lineHeight' === a) &&
                        (u || 0 === u) &&
                        h &&
                        ((h = it(t, a, h, p)),
                        '%' === d
                          ? ((h /= it(t, a, 100, '%') / 100),
                            !0 !== e.strictUnits && (f = h + '%'))
                          : 'em' === d ||
                            'rem' === d ||
                            'vw' === d ||
                            'vh' === d
                          ? (h /= it(t, a, 1, d))
                          : 'px' !== d && ((u = it(t, a, u, d)), (d = 'px')),
                        v && (u || 0 === u) && (c = u + h + d)),
                      v && (u += h),
                      (!h && 0 !== h) || (!u && 0 !== u)
                        ? void 0 !== T[a] &&
                          (c || (c + '' != 'NaN' && null != c))
                          ? ((i = new xt(
                              T,
                              a,
                              u || h || 0,
                              0,
                              i,
                              -1,
                              a,
                              !1,
                              0,
                              f,
                              c
                            )).xs0 =
                              'none' !== c ||
                              ('display' !== a && -1 === a.indexOf('Style'))
                                ? c
                                : f)
                          : $('invalid ' + a + ' tween value: ' + e[a])
                        : ((i = new xt(
                            T,
                            a,
                            h,
                            u - h,
                            i,
                            0,
                            a,
                            !1 !== _ && ('px' === d || 'zIndex' === a),
                            0,
                            f,
                            c
                          )).xs0 = d));
              }
              n && i && !i.plugin && (i.plugin = n);
            }
            return i;
          }),
          (h.setRatio = function(t) {
            var e,
              i,
              s,
              r = this._firstPT;
            if (
              1 !== t ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                t ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                -1e-6 === this._tween._rawPrevTime
              )
                for (; r; ) {
                  if (
                    ((e = r.c * t + r.s),
                    r.r
                      ? (e = Math.round(e))
                      : 1e-6 > e && e > -1e-6 && (e = 0),
                    r.type)
                  )
                    if (1 === r.type)
                      if (((s = r.l), 2 === s))
                        r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                      else if (3 === s)
                        r.t[r.p] =
                          r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                      else if (4 === s)
                        r.t[r.p] =
                          r.xs0 +
                          e +
                          r.xs1 +
                          r.xn1 +
                          r.xs2 +
                          r.xn2 +
                          r.xs3 +
                          r.xn3 +
                          r.xs4;
                      else if (5 === s)
                        r.t[r.p] =
                          r.xs0 +
                          e +
                          r.xs1 +
                          r.xn1 +
                          r.xs2 +
                          r.xn2 +
                          r.xs3 +
                          r.xn3 +
                          r.xs4 +
                          r.xn4 +
                          r.xs5;
                      else {
                        for (i = r.xs0 + e + r.xs1, s = 1; s < r.l; s++)
                          i += r['xn' + s] + r['xs' + (s + 1)];
                        r.t[r.p] = i;
                      }
                    else
                      -1 === r.type
                        ? (r.t[r.p] = r.xs0)
                        : r.setRatio && r.setRatio(t);
                  else r.t[r.p] = e + r.xs0;
                  r = r._next;
                }
              else
                for (; r; )
                  2 !== r.type ? (r.t[r.p] = r.b) : r.setRatio(t),
                    (r = r._next);
            else
              for (; r; ) {
                if (2 !== r.type)
                  if (r.r && -1 !== r.type)
                    if (((e = Math.round(r.s + r.c)), r.type)) {
                      if (1 === r.type) {
                        for (
                          s = r.l, i = r.xs0 + e + r.xs1, s = 1;
                          s < r.l;
                          s++
                        )
                          i += r['xn' + s] + r['xs' + (s + 1)];
                        r.t[r.p] = i;
                      }
                    } else r.t[r.p] = e + r.xs0;
                  else r.t[r.p] = r.e;
                else r.setRatio(t);
                r = r._next;
              }
          }),
          (h._enableTransforms = function(t) {
            (this._transform = this._transform || Zt(this._target, r, !0)),
              (this._transformType =
                (this._transform.svg && Rt) || (!t && 3 !== this._transformType)
                  ? 2
                  : 3);
          });
        var ee = function(t) {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        };
        (h._addLazySet = function(t, e, i) {
          var s = (this._firstPT = new xt(t, e, 0, 0, this._firstPT, 2));
          (s.e = i), (s.setRatio = ee), (s.data = this);
        }),
          (h._linkCSSP = function(t, e, i, s) {
            return (
              t &&
                (e && (e._prev = t),
                t._next && (t._next._prev = t._prev),
                t._prev
                  ? (t._prev._next = t._next)
                  : this._firstPT === t &&
                    ((this._firstPT = t._next), (s = !0)),
                i
                  ? (i._next = t)
                  : s || null !== this._firstPT || (this._firstPT = t),
                (t._next = e),
                (t._prev = i)),
              t
            );
          }),
          (h._mod = function(t) {
            for (var e = this._firstPT; e; )
              'function' == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1),
                (e = e._next);
          }),
          (h._kill = function(e) {
            var i,
              s,
              r,
              n = e;
            if (e.autoAlpha || e.alpha) {
              n = {};
              for (s in e) n[s] = e[s];
              (n.opacity = 1), n.autoAlpha && (n.visibility = 1);
            }
            for (
              e.className &&
                (i = this._classNamePT) &&
                ((r = i.xfirst) && r._prev
                  ? this._linkCSSP(r._prev, i._next, r._prev._prev)
                  : r === this._firstPT && (this._firstPT = i._next),
                i._next && this._linkCSSP(i._next, i._next._next, r._prev),
                (this._classNamePT = null)),
                i = this._firstPT;
              i;

            )
              i.plugin &&
                i.plugin !== s &&
                i.plugin._kill &&
                (i.plugin._kill(e), (s = i.plugin)),
                (i = i._next);
            return t.prototype._kill.call(this, n);
          });
        var ie = function(t, e, i) {
          var s, r, n, a;
          if (t.slice) for (r = t.length; --r > -1; ) ie(t[r], e, i);
          else
            for (s = t.childNodes, r = s.length; --r > -1; )
              (n = s[r]),
                (a = n.type),
                n.style && (e.push(rt(n)), i && i.push(n)),
                (1 !== a && 9 !== a && 11 !== a) ||
                  !n.childNodes.length ||
                  ie(n, e, i);
        };
        return (
          (a.cascadeTo = function(t, i, s) {
            var r,
              n,
              a,
              o,
              l = e.to(t, i, s),
              h = [l],
              _ = [],
              u = [],
              f = [],
              c = e._internals.reservedProps;
            for (
              t = l._targets || l.target,
                ie(t, _, f),
                l.render(i, !0, !0),
                ie(t, u),
                l.render(0, !0, !0),
                l._enabled(!0),
                r = f.length;
              --r > -1;

            )
              if (((n = nt(f[r], _[r], u[r])), n.firstMPT)) {
                n = n.difs;
                for (a in s) c[a] && (n[a] = s[a]);
                o = {};
                for (a in n) o[a] = _[r][a];
                h.push(e.fromTo(f[r], i, o, n));
              }
            return h;
          }),
          t.activate([a]),
          a
        );
      },
      !0
    ),
    (t = function(t) {
      for (; t; ) t.f || t.blob || (t.m = Math.round), (t = t._next);
    }),
    ((e = _gsScope._gsDefine.plugin({
      propName: 'roundProps',
      version: '1.6.0',
      priority: -1,
      API: 2,
      init: function(t, e, i) {
        return (this._tween = i), !0;
      }
    }).prototype)._onInitAllProps = function() {
      for (
        var e,
          i,
          s,
          r = this._tween,
          n = r.vars.roundProps.join
            ? r.vars.roundProps
            : r.vars.roundProps.split(','),
          a = n.length,
          o = {},
          l = r._propLookup.roundProps;
        --a > -1;

      )
        o[n[a]] = Math.round;
      for (a = n.length; --a > -1; )
        for (e = n[a], i = r._firstPT; i; )
          (s = i._next),
            i.pg
              ? i.t._mod(o)
              : i.n === e &&
                (2 === i.f && i.t
                  ? t(i.t._firstPT)
                  : (this._add(i.t, e, i.s, i.c),
                    s && (s._prev = i._prev),
                    i._prev
                      ? (i._prev._next = s)
                      : r._firstPT === i && (r._firstPT = s),
                    (i._next = i._prev = null),
                    (r._propLookup[e] = l))),
            (i = s);
      return !1;
    }),
    (e._add = function(t, e, i, s) {
      this._addTween(t, e, i, i + s, e, Math.round),
        this._overwriteProps.push(e);
    }),
    _gsScope._gsDefine.plugin({
      propName: 'attr',
      API: 2,
      version: '0.6.1',
      init: function(t, e, i, s) {
        var r, n;
        if ('function' != typeof t.setAttribute) return !1;
        for (r in e)
          (n = e[r]),
            'function' == typeof n && (n = n(s, t)),
            this._addTween(
              t,
              'setAttribute',
              t.getAttribute(r) + '',
              n + '',
              r,
              !1,
              r
            ),
            this._overwriteProps.push(r);
        return !0;
      }
    }),
    (_gsScope._gsDefine.plugin({
      propName: 'directionalRotation',
      version: '0.3.1',
      API: 2,
      init: function(t, e, i, s) {
        'object' != typeof e && (e = { rotation: e }), (this.finals = {});
        var r,
          n,
          a,
          o,
          l,
          h,
          _ = !0 === e.useRadians ? 2 * Math.PI : 360;
        for (r in e)
          'useRadians' !== r &&
            ((o = e[r]),
            'function' == typeof o && (o = o(s, t)),
            (h = (o + '').split('_')),
            (n = h[0]),
            (a = parseFloat(
              'function' != typeof t[r]
                ? t[r]
                : t[
                    r.indexOf('set') ||
                    'function' != typeof t['get' + r.substr(3)]
                      ? r
                      : 'get' + r.substr(3)
                  ]()
            )),
            (o = this.finals[r] =
              'string' == typeof n && '=' === n.charAt(1)
                ? a + parseInt(n.charAt(0) + '1', 10) * Number(n.substr(2))
                : Number(n) || 0),
            (l = o - a),
            h.length &&
              ((n = h.join('_')),
              -1 !== n.indexOf('short') &&
                ((l %= _), l !== l % (_ / 2) && (l = 0 > l ? l + _ : l - _)),
              -1 !== n.indexOf('_cw') && 0 > l
                ? (l = ((l + 9999999999 * _) % _) - ((l / _) | 0) * _)
                : -1 !== n.indexOf('ccw') &&
                  l > 0 &&
                  (l = ((l - 9999999999 * _) % _) - ((l / _) | 0) * _)),
            (l > 1e-6 || -1e-6 > l) &&
              (this._addTween(t, r, a, a + l, r),
              this._overwriteProps.push(r)));
        return !0;
      },
      set: function(t) {
        var e;
        if (1 !== t) this._super.setRatio.call(this, t);
        else
          for (e = this._firstPT; e; )
            e.f ? e.t[e.p](this.finals[e.p]) : (e.t[e.p] = this.finals[e.p]),
              (e = e._next);
      }
    })._autoCSS = !0),
    _gsScope._gsDefine(
      'easing.Back',
      ['easing.Ease'],
      function(t) {
        var e,
          i,
          s,
          r = _gsScope.GreenSockGlobals || _gsScope,
          n = r.com.greensock,
          a = 2 * Math.PI,
          o = Math.PI / 2,
          l = n._class,
          h = function(e, i) {
            var s = l('easing.' + e, function() {}, !0),
              r = (s.prototype = new t());
            return (r.constructor = s), (r.getRatio = i), s;
          },
          _ = t.register || function() {},
          u = function(t, e, i, s, r) {
            var n = l(
              'easing.' + t,
              { easeOut: new e(), easeIn: new i(), easeInOut: new s() },
              !0
            );
            return _(n, t), n;
          },
          f = function(t, e, i) {
            (this.t = t),
              (this.v = e),
              i &&
                ((this.next = i),
                (i.prev = this),
                (this.c = i.v - e),
                (this.gap = i.t - t));
          },
          c = function(e, i) {
            var s = l(
                'easing.' + e,
                function(t) {
                  (this._p1 = t || 0 === t ? t : 1.70158),
                    (this._p2 = 1.525 * this._p1);
                },
                !0
              ),
              r = (s.prototype = new t());
            return (
              (r.constructor = s),
              (r.getRatio = i),
              (r.config = function(t) {
                return new s(t);
              }),
              s
            );
          },
          p = u(
            'Back',
            c('BackOut', function(t) {
              return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
            }),
            c('BackIn', function(t) {
              return t * t * ((this._p1 + 1) * t - this._p1);
            }),
            c('BackInOut', function(t) {
              return (t *= 2) < 1
                ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
            })
          ),
          d = l(
            'easing.SlowMo',
            function(t, e, i) {
              (e = e || 0 === e ? e : 0.7),
                null == t ? (t = 0.7) : t > 1 && (t = 1),
                (this._p = 1 !== t ? e : 0),
                (this._p1 = (1 - t) / 2),
                (this._p2 = t),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = !0 === i);
            },
            !0
          ),
          m = (d.prototype = new t());
        return (
          (m.constructor = d),
          (m.getRatio = function(t) {
            var e = t + (0.5 - t) * this._p;
            return t < this._p1
              ? this._calcEnd
                ? 1 - (t = 1 - t / this._p1) * t
                : e - (t = 1 - t / this._p1) * t * t * t * e
              : t > this._p3
              ? this._calcEnd
                ? 1 === t
                  ? 0
                  : 1 - (t = (t - this._p3) / this._p1) * t
                : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
              : this._calcEnd
              ? 1
              : e;
          }),
          (d.ease = new d(0.7, 0.7)),
          (m.config = d.config = function(t, e, i) {
            return new d(t, e, i);
          }),
          ((m = (e = l(
            'easing.SteppedEase',
            function(t, e) {
              (t = t || 1),
                (this._p1 = 1 / t),
                (this._p2 = t + (e ? 0 : 1)),
                (this._p3 = e ? 1 : 0);
            },
            !0
          )).prototype = new t()).constructor = e),
          (m.getRatio = function(t) {
            return (
              0 > t ? (t = 0) : t >= 1 && (t = 0.999999999),
              (((this._p2 * t) | 0) + this._p3) * this._p1
            );
          }),
          (m.config = e.config = function(t, i) {
            return new e(t, i);
          }),
          ((m = (i = l(
            'easing.RoughEase',
            function(e) {
              for (
                var i,
                  s,
                  r,
                  n,
                  a,
                  o,
                  l = (e = e || {}).taper || 'none',
                  h = [],
                  _ = 0,
                  u = 0 | (e.points || 20),
                  c = u,
                  p = !1 !== e.randomize,
                  d = !0 === e.clamp,
                  m = e.template instanceof t ? e.template : null,
                  g = 'number' == typeof e.strength ? 0.4 * e.strength : 0.4;
                --c > -1;

              )
                (i = p ? Math.random() : (1 / u) * c),
                  (s = m ? m.getRatio(i) : i),
                  'none' === l
                    ? (r = g)
                    : 'out' === l
                    ? ((n = 1 - i), (r = n * n * g))
                    : 'in' === l
                    ? (r = i * i * g)
                    : 0.5 > i
                    ? ((n = 2 * i), (r = n * n * 0.5 * g))
                    : ((n = 2 * (1 - i)), (r = n * n * 0.5 * g)),
                  p
                    ? (s += Math.random() * r - 0.5 * r)
                    : c % 2
                    ? (s += 0.5 * r)
                    : (s -= 0.5 * r),
                  d && (s > 1 ? (s = 1) : 0 > s && (s = 0)),
                  (h[_++] = { x: i, y: s });
              for (
                h.sort(function(t, e) {
                  return t.x - e.x;
                }),
                  o = new f(1, 1, null),
                  c = u;
                --c > -1;

              )
                (a = h[c]), (o = new f(a.x, a.y, o));
              this._prev = new f(0, 0, 0 !== o.t ? o : o.next);
            },
            !0
          )).prototype = new t()).constructor = i),
          (m.getRatio = function(t) {
            var e = this._prev;
            if (t > e.t) {
              for (; e.next && t >= e.t; ) e = e.next;
              e = e.prev;
            } else for (; e.prev && t <= e.t; ) e = e.prev;
            return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
          }),
          (m.config = function(t) {
            return new i(t);
          }),
          (i.ease = new i()),
          u(
            'Bounce',
            h('BounceOut', function(t) {
              return 1 / 2.75 > t
                ? 7.5625 * t * t
                : 2 / 2.75 > t
                ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                : 2.5 / 2.75 > t
                ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }),
            h('BounceIn', function(t) {
              return (t = 1 - t) < 1 / 2.75
                ? 1 - 7.5625 * t * t
                : 2 / 2.75 > t
                ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                : 2.5 / 2.75 > t
                ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
            }),
            h('BounceInOut', function(t) {
              var e = 0.5 > t;
              return (
                (t =
                  1 / 2.75 > (t = e ? 1 - 2 * t : 2 * t - 1)
                    ? 7.5625 * t * t
                    : 2 / 2.75 > t
                    ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                    : 2.5 / 2.75 > t
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                e ? 0.5 * (1 - t) : 0.5 * t + 0.5
              );
            })
          ),
          u(
            'Circ',
            h('CircOut', function(t) {
              return Math.sqrt(1 - (t -= 1) * t);
            }),
            h('CircIn', function(t) {
              return -(Math.sqrt(1 - t * t) - 1);
            }),
            h('CircInOut', function(t) {
              return (t *= 2) < 1
                ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            })
          ),
          u(
            'Elastic',
            (s = function(e, i, s) {
              var r = l(
                  'easing.' + e,
                  function(t, e) {
                    (this._p1 = t >= 1 ? t : 1),
                      (this._p2 = (e || s) / (1 > t ? t : 1)),
                      (this._p3 =
                        (this._p2 / a) * (Math.asin(1 / this._p1) || 0)),
                      (this._p2 = a / this._p2);
                  },
                  !0
                ),
                n = (r.prototype = new t());
              return (
                (n.constructor = r),
                (n.getRatio = i),
                (n.config = function(t, e) {
                  return new r(t, e);
                }),
                r
              );
            })(
              'ElasticOut',
              function(t) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * t) *
                    Math.sin((t - this._p3) * this._p2) +
                  1
                );
              },
              0.3
            ),
            s(
              'ElasticIn',
              function(t) {
                return (
                  -this._p1 *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin((t - this._p3) * this._p2)
                );
              },
              0.3
            ),
            s(
              'ElasticInOut',
              function(t) {
                return (t *= 2) < 1
                  ? this._p1 *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2) *
                      -0.5
                  : this._p1 *
                      Math.pow(2, -10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2) *
                      0.5 +
                      1;
              },
              0.45
            )
          ),
          u(
            'Expo',
            h('ExpoOut', function(t) {
              return 1 - Math.pow(2, -10 * t);
            }),
            h('ExpoIn', function(t) {
              return Math.pow(2, 10 * (t - 1)) - 0.001;
            }),
            h('ExpoInOut', function(t) {
              return (t *= 2) < 1
                ? 0.5 * Math.pow(2, 10 * (t - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
            })
          ),
          u(
            'Sine',
            h('SineOut', function(t) {
              return Math.sin(t * o);
            }),
            h('SineIn', function(t) {
              return 1 - Math.cos(t * o);
            }),
            h('SineInOut', function(t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            })
          ),
          l(
            'easing.EaseLookup',
            {
              find: function(e) {
                return t.map[e];
              }
            },
            !0
          ),
          _(r.SlowMo, 'SlowMo', 'ease,'),
          _(i, 'RoughEase', 'ease,'),
          _(e, 'SteppedEase', 'ease,'),
          p
        );
      },
      !0
    );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function(t, e) {
    'use strict';
    var i,
      s,
      r = {},
      n = t.document,
      a = (t.GreenSockGlobals = t.GreenSockGlobals || t);
    if (!a.TweenLite) {
      var o,
        l,
        h,
        _,
        u,
        f = function(t) {
          var e,
            i = t.split('.'),
            s = a;
          for (e = 0; e < i.length; e++) s[i[e]] = s = s[i[e]] || {};
          return s;
        },
        c = f('com.greensock'),
        p = 1e-10,
        d = function(t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        m = function() {},
        g =
          ((i = Object.prototype.toString),
          (s = i.call([])),
          function(t) {
            return (
              null != t &&
              (t instanceof Array ||
                ('object' == typeof t && !!t.push && i.call(t) === s))
            );
          }),
        y = {},
        v = function(i, s, n, o) {
          (this.sc = y[i] ? y[i].sc : []),
            (y[i] = this),
            (this.gsClass = null),
            (this.func = n);
          var l = [];
          (this.check = function(h) {
            for (var _, u, c, p, d = s.length, m = d; --d > -1; )
              (_ = y[s[d]] || new v(s[d], [])).gsClass
                ? ((l[d] = _.gsClass), m--)
                : h && _.sc.push(this);
            if (0 === m && n) {
              if (
                ((c = (u = ('com.greensock.' + i).split('.')).pop()),
                (p = f(u.join('.'))[c] = this.gsClass = n.apply(n, l)),
                o)
              )
                if (
                  ((a[c] = r[c] = p),
                  'undefined' != typeof module && module.exports)
                )
                  if (i === e) {
                    module.exports = r[e] = p;
                    for (d in r) p[d] = r[d];
                  } else r[e] && (r[e][c] = p);
                else
                  'function' == typeof define &&
                    define.amd &&
                    define((t.GreenSockAMDPath
                      ? t.GreenSockAMDPath + '/'
                      : '') + i.split('.').pop(), [], function() {
                      return p;
                    });
              for (d = 0; d < this.sc.length; d++) this.sc[d].check();
            }
          }),
            this.check(!0);
        },
        T = (t._gsDefine = function(t, e, i, s) {
          return new v(t, e, i, s);
        }),
        x = (c._class = function(t, e, i) {
          return (
            (e = e || function() {}),
            T(
              t,
              [],
              function() {
                return e;
              },
              i
            ),
            e
          );
        });
      T.globals = a;
      var b = [0, 0, 1, 1],
        w = x(
          'easing.Ease',
          function(t, e, i, s) {
            (this._func = t),
              (this._type = i || 0),
              (this._power = s || 0),
              (this._params = e ? b.concat(e) : b);
          },
          !0
        ),
        P = (w.map = {}),
        O = (w.register = function(t, e, i, s) {
          for (
            var r,
              n,
              a,
              o,
              l = e.split(','),
              h = l.length,
              _ = (i || 'easeIn,easeOut,easeInOut').split(',');
            --h > -1;

          )
            for (
              n = l[h],
                r = s ? x('easing.' + n, null, !0) : c.easing[n] || {},
                a = _.length;
              --a > -1;

            )
              (o = _[a]),
                (P[n + '.' + o] = P[o + n] = r[o] = t.getRatio
                  ? t
                  : t[o] || new t());
        });
      for (
        (h = w.prototype)._calcEnd = !1,
          h.getRatio = function(t) {
            if (this._func)
              return (
                (this._params[0] = t), this._func.apply(null, this._params)
              );
            var e = this._type,
              i = this._power,
              s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
            return (
              1 === i
                ? (s *= s)
                : 2 === i
                ? (s *= s * s)
                : 3 === i
                ? (s *= s * s * s)
                : 4 === i && (s *= s * s * s * s),
              1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2
            );
          },
          l = (o = ['Linear', 'Quad', 'Cubic', 'Quart', 'Quint,Strong']).length;
        --l > -1;

      )
        (h = o[l] + ',Power' + l),
          O(new w(null, null, 1, l), h, 'easeOut', !0),
          O(
            new w(null, null, 2, l),
            h,
            'easeIn' + (0 === l ? ',easeNone' : '')
          ),
          O(new w(null, null, 3, l), h, 'easeInOut');
      (P.linear = c.easing.Linear.easeIn), (P.swing = c.easing.Quad.easeInOut);
      var S = x('events.EventDispatcher', function(t) {
        (this._listeners = {}), (this._eventTarget = t || this);
      });
      ((h = S.prototype).addEventListener = function(t, e, i, s, r) {
        r = r || 0;
        var n,
          a,
          o = this._listeners[t],
          l = 0;
        for (
          this !== _ || u || _.wake(),
            null == o && (this._listeners[t] = o = []),
            a = o.length;
          --a > -1;

        )
          (n = o[a]),
            n.c === e && n.s === i
              ? o.splice(a, 1)
              : 0 === l && n.pr < r && (l = a + 1);
        o.splice(l, 0, { c: e, s: i, up: s, pr: r });
      }),
        (h.removeEventListener = function(t, e) {
          var i,
            s = this._listeners[t];
          if (s)
            for (i = s.length; --i > -1; )
              if (s[i].c === e) return void s.splice(i, 1);
        }),
        (h.dispatchEvent = function(t) {
          var e,
            i,
            s,
            r = this._listeners[t];
          if (r)
            for (
              e = r.length, e > 1 && (r = r.slice(0)), i = this._eventTarget;
              --e > -1;

            )
              (s = r[e]),
                s &&
                  (s.up
                    ? s.c.call(s.s || i, { type: t, target: i })
                    : s.c.call(s.s || i));
        });
      var k = t.requestAnimationFrame,
        R = t.cancelAnimationFrame,
        A =
          Date.now ||
          function() {
            return new Date().getTime();
          },
        C = A();
      for (l = (o = ['ms', 'moz', 'webkit', 'o']).length; --l > -1 && !k; )
        (k = t[o[l] + 'RequestAnimationFrame']),
          (R =
            t[o[l] + 'CancelAnimationFrame'] ||
            t[o[l] + 'CancelRequestAnimationFrame']);
      x('Ticker', function(t, e) {
        var i,
          s,
          r,
          a,
          o,
          l = this,
          h = A(),
          f = !(!1 === e || !k) && 'auto',
          c = 500,
          p = 33,
          d = function(t) {
            var e,
              n,
              _ = A() - C;
            _ > c && (h += _ - p),
              (C += _),
              (l.time = (C - h) / 1e3),
              (e = l.time - o),
              (!i || e > 0 || !0 === t) &&
                (l.frame++, (o += e + (e >= a ? 0.004 : a - e)), (n = !0)),
              !0 !== t && (r = s(d)),
              n && l.dispatchEvent('tick');
          };
        S.call(l),
          (l.time = l.frame = 0),
          (l.tick = function() {
            d(!0);
          }),
          (l.lagSmoothing = function(t, e) {
            return arguments.length
              ? ((c = t || 1e10), void (p = Math.min(e, c, 0)))
              : 1e10 > c;
          }),
          (l.sleep = function() {
            null != r &&
              (f && R ? R(r) : clearTimeout(r),
              (s = m),
              (r = null),
              l === _ && (u = !1));
          }),
          (l.wake = function(t) {
            null !== r
              ? l.sleep()
              : t
              ? (h += -C + (C = A()))
              : l.frame > 10 && (C = A() - c + 5),
              (s =
                0 === i
                  ? m
                  : f && k
                  ? k
                  : function(t) {
                      return setTimeout(t, (1e3 * (o - l.time) + 1) | 0);
                    }),
              l === _ && (u = !0),
              d(2);
          }),
          (l.fps = function(t) {
            return arguments.length
              ? ((a = 1 / ((i = t) || 60)), (o = this.time + a), void l.wake())
              : i;
          }),
          (l.useRAF = function(t) {
            return arguments.length ? (l.sleep(), (f = t), void l.fps(i)) : f;
          }),
          l.fps(t),
          setTimeout(function() {
            'auto' === f &&
              l.frame < 5 &&
              'hidden' !== n.visibilityState &&
              l.useRAF(!1);
          }, 1500);
      }),
        ((h = c.Ticker.prototype = new c.events.EventDispatcher()).constructor =
          c.Ticker);
      var D = x('core.Animation', function(t, e) {
        if (
          ((this.vars = e = e || {}),
          (this._duration = this._totalDuration = t || 0),
          (this._delay = Number(e.delay) || 0),
          (this._timeScale = 1),
          (this._active = !0 === e.immediateRender),
          (this.data = e.data),
          (this._reversed = !0 === e.reversed),
          $)
        ) {
          u || _.wake();
          var i = this.vars.useFrames ? H : $;
          i.add(this, i._time), this.vars.paused && this.paused(!0);
        }
      });
      (_ = D.ticker = new c.Ticker()),
        ((h = D.prototype)._dirty = h._gc = h._initted = h._paused = !1),
        (h._totalTime = h._time = 0),
        (h._rawPrevTime = -1),
        (h._next = h._last = h._onUpdate = h._timeline = h.timeline = null),
        (h._paused = !1);
      var M = function() {
        u &&
          A() - C > 2e3 &&
          ('hidden' !== n.visibilityState || !_.lagSmoothing()) &&
          _.wake();
        var t = setTimeout(M, 2e3);
        t.unref && t.unref();
      };
      M(),
        (h.play = function(t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }),
        (h.pause = function(t, e) {
          return null != t && this.seek(t, e), this.paused(!0);
        }),
        (h.resume = function(t, e) {
          return null != t && this.seek(t, e), this.paused(!1);
        }),
        (h.seek = function(t, e) {
          return this.totalTime(Number(t), !1 !== e);
        }),
        (h.restart = function(t, e) {
          return this.reversed(!1)
            .paused(!1)
            .totalTime(t ? -this._delay : 0, !1 !== e, !0);
        }),
        (h.reverse = function(t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (h.render = function(t, e, i) {}),
        (h.invalidate = function() {
          return (
            (this._time = this._totalTime = 0),
            (this._initted = this._gc = !1),
            (this._rawPrevTime = -1),
            (this._gc || !this.timeline) && this._enabled(!0),
            this
          );
        }),
        (h.isActive = function() {
          var t,
            e = this._timeline,
            i = this._startTime;
          return (
            !e ||
            (!this._gc &&
              !this._paused &&
              e.isActive() &&
              (t = e.rawTime(!0)) >= i &&
              t < i + this.totalDuration() / this._timeScale - 1e-7)
          );
        }),
        (h._enabled = function(t, e) {
          return (
            u || _.wake(),
            (this._gc = !t),
            (this._active = this.isActive()),
            !0 !== e &&
              (t && !this.timeline
                ? this._timeline.add(this, this._startTime - this._delay)
                : !t && this.timeline && this._timeline._remove(this, !0)),
            !1
          );
        }),
        (h._kill = function(t, e) {
          return this._enabled(!1, !1);
        }),
        (h.kill = function(t, e) {
          return this._kill(t, e), this;
        }),
        (h._uncache = function(t) {
          for (var e = t ? this : this.timeline; e; )
            (e._dirty = !0), (e = e.timeline);
          return this;
        }),
        (h._swapSelfInParams = function(t) {
          for (var e = t.length, i = t.concat(); --e > -1; )
            '{self}' === t[e] && (i[e] = this);
          return i;
        }),
        (h._callback = function(t) {
          var e = this.vars,
            i = e[t],
            s = e[t + 'Params'],
            r = e[t + 'Scope'] || e.callbackScope || this;
          switch (s ? s.length : 0) {
            case 0:
              i.call(r);
              break;
            case 1:
              i.call(r, s[0]);
              break;
            case 2:
              i.call(r, s[0], s[1]);
              break;
            default:
              i.apply(r, s);
          }
        }),
        (h.eventCallback = function(t, e, i, s) {
          if ('on' === (t || '').substr(0, 2)) {
            var r = this.vars;
            if (1 === arguments.length) return r[t];
            null == e
              ? delete r[t]
              : ((r[t] = e),
                (r[t + 'Params'] =
                  g(i) && -1 !== i.join('').indexOf('{self}')
                    ? this._swapSelfInParams(i)
                    : i),
                (r[t + 'Scope'] = s)),
              'onUpdate' === t && (this._onUpdate = e);
          }
          return this;
        }),
        (h.delay = function(t) {
          return arguments.length
            ? (this._timeline.smoothChildTiming &&
                this.startTime(this._startTime + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (h.duration = function(t) {
          return arguments.length
            ? ((this._duration = this._totalDuration = t),
              this._uncache(!0),
              this._timeline.smoothChildTiming &&
                this._time > 0 &&
                this._time < this._duration &&
                0 !== t &&
                this.totalTime(this._totalTime * (t / this._duration), !0),
              this)
            : ((this._dirty = !1), this._duration);
        }),
        (h.totalDuration = function(t) {
          return (
            (this._dirty = !1),
            arguments.length ? this.duration(t) : this._totalDuration
          );
        }),
        (h.time = function(t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              this.totalTime(t > this._duration ? this._duration : t, e))
            : this._time;
        }),
        (h.totalTime = function(t, e, i) {
          if ((u || _.wake(), !arguments.length)) return this._totalTime;
          if (this._timeline) {
            if (
              (0 > t && !i && (t += this.totalDuration()),
              this._timeline.smoothChildTiming)
            ) {
              this._dirty && this.totalDuration();
              var s = this._totalDuration,
                r = this._timeline;
              if (
                (t > s && !i && (t = s),
                (this._startTime =
                  (this._paused ? this._pauseTime : r._time) -
                  (this._reversed ? s - t : t) / this._timeScale),
                r._dirty || this._uncache(!1),
                r._timeline)
              )
                for (; r._timeline; )
                  r._timeline._time !==
                    (r._startTime + r._totalTime) / r._timeScale &&
                    r.totalTime(r._totalTime, !0),
                    (r = r._timeline);
            }
            this._gc && this._enabled(!0, !1),
              (this._totalTime !== t || 0 === this._duration) &&
                (I.length && K(), this.render(t, e, !1), I.length && K());
          }
          return this;
        }),
        (h.progress = h.totalProgress = function(t, e) {
          var i = this.duration();
          return arguments.length
            ? this.totalTime(i * t, e)
            : i
            ? this._time / i
            : this.ratio;
        }),
        (h.startTime = function(t) {
          return arguments.length
            ? (t !== this._startTime &&
                ((this._startTime = t),
                this.timeline &&
                  this.timeline._sortChildren &&
                  this.timeline.add(this, t - this._delay)),
              this)
            : this._startTime;
        }),
        (h.endTime = function(t) {
          return (
            this._startTime +
            (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
          );
        }),
        (h.timeScale = function(t) {
          if (!arguments.length) return this._timeScale;
          var e, i;
          for (
            t = t || p,
              this._timeline &&
                this._timeline.smoothChildTiming &&
                ((i =
                  (e = this._pauseTime) || 0 === e
                    ? e
                    : this._timeline.totalTime()),
                (this._startTime =
                  i - ((i - this._startTime) * this._timeScale) / t)),
              this._timeScale = t,
              i = this.timeline;
            i && i.timeline;

          )
            (i._dirty = !0), i.totalDuration(), (i = i.timeline);
          return this;
        }),
        (h.reversed = function(t) {
          return arguments.length
            ? (t != this._reversed &&
                ((this._reversed = t),
                this.totalTime(
                  this._timeline && !this._timeline.smoothChildTiming
                    ? this.totalDuration() - this._totalTime
                    : this._totalTime,
                  !0
                )),
              this)
            : this._reversed;
        }),
        (h.paused = function(t) {
          if (!arguments.length) return this._paused;
          var e,
            i,
            s = this._timeline;
          return (
            t != this._paused &&
              s &&
              (u || t || _.wake(),
              (i = (e = s.rawTime()) - this._pauseTime),
              !t &&
                s.smoothChildTiming &&
                ((this._startTime += i), this._uncache(!1)),
              (this._pauseTime = t ? e : null),
              (this._paused = t),
              (this._active = this.isActive()),
              !t &&
                0 !== i &&
                this._initted &&
                this.duration() &&
                ((e = s.smoothChildTiming
                  ? this._totalTime
                  : (e - this._startTime) / this._timeScale),
                this.render(e, e === this._totalTime, !0))),
            this._gc && !t && this._enabled(!0, !1),
            this
          );
        });
      var F = x('core.SimpleTimeline', function(t) {
        D.call(this, 0, t),
          (this.autoRemoveChildren = this.smoothChildTiming = !0);
      });
      ((h = F.prototype = new D()).constructor = F),
        (h.kill()._gc = !1),
        (h._first = h._last = h._recent = null),
        (h._sortChildren = !1),
        (h.add = h.insert = function(t, e, i, s) {
          var r, n;
          if (
            ((t._startTime = Number(e || 0) + t._delay),
            t._paused &&
              this !== t._timeline &&
              (t._pauseTime =
                t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
            t.timeline && t.timeline._remove(t, !0),
            (t.timeline = t._timeline = this),
            t._gc && t._enabled(!0, !0),
            (r = this._last),
            this._sortChildren)
          )
            for (n = t._startTime; r && r._startTime > n; ) r = r._prev;
          return (
            r
              ? ((t._next = r._next), (r._next = t))
              : ((t._next = this._first), (this._first = t)),
            t._next ? (t._next._prev = t) : (this._last = t),
            (t._prev = r),
            (this._recent = t),
            this._timeline && this._uncache(!0),
            this
          );
        }),
        (h._remove = function(t, e) {
          return (
            t.timeline === this &&
              (e || t._enabled(!1, !0),
              t._prev
                ? (t._prev._next = t._next)
                : this._first === t && (this._first = t._next),
              t._next
                ? (t._next._prev = t._prev)
                : this._last === t && (this._last = t._prev),
              (t._next = t._prev = t.timeline = null),
              t === this._recent && (this._recent = this._last),
              this._timeline && this._uncache(!0)),
            this
          );
        }),
        (h.render = function(t, e, i) {
          var s,
            r = this._first;
          for (this._totalTime = this._time = this._rawPrevTime = t; r; )
            (s = r._next),
              (r._active || (t >= r._startTime && !r._paused && !r._gc)) &&
                (r._reversed
                  ? r.render(
                      (r._dirty ? r.totalDuration() : r._totalDuration) -
                        (t - r._startTime) * r._timeScale,
                      e,
                      i
                    )
                  : r.render((t - r._startTime) * r._timeScale, e, i)),
              (r = s);
        }),
        (h.rawTime = function() {
          return u || _.wake(), this._totalTime;
        });
      var z = x(
          'TweenLite',
          function(e, i, s) {
            if (
              (D.call(this, i, s),
              (this.render = z.prototype.render),
              null == e)
            )
              throw 'Cannot tween a null target.';
            this.target = e = 'string' != typeof e ? e : z.selector(e) || e;
            var r,
              n,
              a,
              o =
                e.jquery ||
                (e.length &&
                  e !== t &&
                  e[0] &&
                  (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
              l = this.vars.overwrite;
            if (
              ((this._overwrite = l =
                null == l
                  ? Z[z.defaultOverwrite]
                  : 'number' == typeof l
                  ? l >> 0
                  : Z[l]),
              (o || e instanceof Array || (e.push && g(e))) &&
                'number' != typeof e[0])
            )
              for (
                this._targets = a = d(e),
                  this._propLookup = [],
                  this._siblings = [],
                  r = 0;
                r < a.length;
                r++
              )
                (n = a[r]),
                  n
                    ? 'string' != typeof n
                      ? n.length &&
                        n !== t &&
                        n[0] &&
                        (n[0] === t ||
                          (n[0].nodeType && n[0].style && !n.nodeType))
                        ? (a.splice(r--, 1),
                          (this._targets = a = a.concat(d(n))))
                        : ((this._siblings[r] = J(n, this, !1)),
                          1 === l &&
                            this._siblings[r].length > 1 &&
                            et(n, this, null, 1, this._siblings[r]))
                      : ((n = a[r--] = z.selector(n)),
                        'string' == typeof n && a.splice(r + 1, 1))
                    : a.splice(r--, 1);
            else
              (this._propLookup = {}),
                (this._siblings = J(e, this, !1)),
                1 === l &&
                  this._siblings.length > 1 &&
                  et(e, this, null, 1, this._siblings);
            (this.vars.immediateRender ||
              (0 === i &&
                0 === this._delay &&
                !1 !== this.vars.immediateRender)) &&
              ((this._time = -p), this.render(Math.min(0, -this._delay)));
          },
          !0
        ),
        E = function(e) {
          return (
            e &&
            e.length &&
            e !== t &&
            e[0] &&
            (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
          );
        };
      ((h = z.prototype = new D()).constructor = z),
        (h.kill()._gc = !1),
        (h.ratio = 0),
        (h._firstPT = h._targets = h._overwrittenProps = h._startAt = null),
        (h._notifyPluginsOfEnabled = h._lazy = !1),
        (z.version = '1.20.3'),
        (z.defaultEase = h._ease = new w(null, null, 1, 1)),
        (z.defaultOverwrite = 'auto'),
        (z.ticker = _),
        (z.autoSleep = 120),
        (z.lagSmoothing = function(t, e) {
          _.lagSmoothing(t, e);
        }),
        (z.selector =
          t.$ ||
          t.jQuery ||
          function(e) {
            var i = t.$ || t.jQuery;
            return i
              ? ((z.selector = i), i(e))
              : void 0 === n
              ? e
              : n.querySelectorAll
              ? n.querySelectorAll(e)
              : n.getElementById('#' === e.charAt(0) ? e.substr(1) : e);
          });
      var I = [],
        X = {},
        N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        L = /[\+-]=-?[\.\d]/,
        B = function(t) {
          for (var e, i = this._firstPT; i; )
            (e = i.blob
              ? 1 === t && null != this.end
                ? this.end
                : t
                ? this.join('')
                : this.start
              : i.c * t + i.s),
              i.m
                ? (e = i.m(e, this._target || i.t))
                : 1e-6 > e && e > -1e-6 && !i.blob && (e = 0),
              i.f ? (i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e)) : (i.t[i.p] = e),
              (i = i._next);
        },
        Y = function(t, e, i, s) {
          var r,
            n,
            a,
            o,
            l,
            h,
            _,
            u = [],
            f = 0,
            c = '',
            p = 0;
          for (
            u.start = t,
              u.end = e,
              t = u[0] = t + '',
              e = u[1] = e + '',
              i && (i(u), (t = u[0]), (e = u[1])),
              u.length = 0,
              r = t.match(N) || [],
              n = e.match(N) || [],
              s &&
                ((s._next = null), (s.blob = 1), (u._firstPT = u._applyPT = s)),
              l = n.length,
              o = 0;
            l > o;
            o++
          )
            (_ = n[o]),
              (h = e.substr(f, e.indexOf(_, f) - f)),
              (c += h || !o ? h : ','),
              (f += h.length),
              p ? (p = (p + 1) % 5) : 'rgba(' === h.substr(-5) && (p = 1),
              _ === r[o] || r.length <= o
                ? (c += _)
                : (c && (u.push(c), (c = '')),
                  (a = parseFloat(r[o])),
                  u.push(a),
                  (u._firstPT = {
                    _next: u._firstPT,
                    t: u,
                    p: u.length - 1,
                    s: a,
                    c:
                      ('=' === _.charAt(1)
                        ? parseInt(_.charAt(0) + '1', 10) *
                          parseFloat(_.substr(2))
                        : parseFloat(_) - a) || 0,
                    f: 0,
                    m: p && 4 > p ? Math.round : 0
                  })),
              (f += _.length);
          return (
            (c += e.substr(f)) && u.push(c),
            (u.setRatio = B),
            L.test(e) && (u.end = null),
            u
          );
        },
        j = function(t, e, i, s, r, n, a, o, l) {
          'function' == typeof s && (s = s(l || 0, t));
          var h = typeof t[e],
            _ =
              'function' !== h
                ? ''
                : e.indexOf('set') ||
                  'function' != typeof t['get' + e.substr(3)]
                ? e
                : 'get' + e.substr(3),
            u = 'get' !== i ? i : _ ? (a ? t[_](a) : t[_]()) : t[e],
            f = 'string' == typeof s && '=' === s.charAt(1),
            c = {
              t: t,
              p: e,
              s: u,
              f: 'function' === h,
              pg: 0,
              n: r || e,
              m: n ? ('function' == typeof n ? n : Math.round) : 0,
              pr: 0,
              c: f
                ? parseInt(s.charAt(0) + '1', 10) * parseFloat(s.substr(2))
                : parseFloat(s) - u || 0
            };
          return (
            ('number' != typeof u || ('number' != typeof s && !f)) &&
              (a ||
              isNaN(u) ||
              (!f && isNaN(s)) ||
              'boolean' == typeof u ||
              'boolean' == typeof s
                ? ((c.fp = a),
                  (c = {
                    t: Y(
                      u,
                      f ? parseFloat(c.s) + c.c : s,
                      o || z.defaultStringFilter,
                      c
                    ),
                    p: 'setRatio',
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: r || e,
                    pr: 0,
                    m: 0
                  }))
                : ((c.s = parseFloat(u)),
                  f || (c.c = parseFloat(s) - c.s || 0))),
            c.c
              ? ((c._next = this._firstPT) && (c._next._prev = c),
                (this._firstPT = c),
                c)
              : void 0
          );
        },
        U = (z._internals = {
          isArray: g,
          isSelector: E,
          lazyTweens: I,
          blobDif: Y
        }),
        V = (z._plugins = {}),
        q = (U.tweenLookup = {}),
        W = 0,
        G = (U.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1,
          callbackScope: 1,
          stringFilter: 1,
          id: 1,
          yoyoEase: 1
        }),
        Z = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0
        },
        H = (D._rootFramesTimeline = new F()),
        $ = (D._rootTimeline = new F()),
        Q = 30,
        K = (U.lazyRender = function() {
          var t,
            e = I.length;
          for (X = {}; --e > -1; )
            (t = I[e]),
              t &&
                !1 !== t._lazy &&
                (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
          I.length = 0;
        });
      ($._startTime = _.time),
        (H._startTime = _.frame),
        ($._active = H._active = !0),
        setTimeout(K, 1),
        (D._updateRoot = z.render = function() {
          var t, e, i;
          if (
            (I.length && K(),
            $.render((_.time - $._startTime) * $._timeScale, !1, !1),
            H.render((_.frame - H._startTime) * H._timeScale, !1, !1),
            I.length && K(),
            _.frame >= Q)
          ) {
            Q = _.frame + (parseInt(z.autoSleep, 10) || 120);
            for (i in q) {
              for (t = (e = q[i].tweens).length; --t > -1; )
                e[t]._gc && e.splice(t, 1);
              0 === e.length && delete q[i];
            }
            if (
              (!(i = $._first) || i._paused) &&
              z.autoSleep &&
              !H._first &&
              1 === _._listeners.tick.length
            ) {
              for (; i && i._paused; ) i = i._next;
              i || _.sleep();
            }
          }
        }),
        _.addEventListener('tick', D._updateRoot);
      var J = function(t, e, i) {
          var s,
            r,
            n = t._gsTweenID;
          if (
            (q[n || (t._gsTweenID = n = 't' + W++)] ||
              (q[n] = { target: t, tweens: [] }),
            e && (((s = q[n].tweens)[(r = s.length)] = e), i))
          )
            for (; --r > -1; ) s[r] === e && s.splice(r, 1);
          return q[n].tweens;
        },
        tt = function(t, e, i, s) {
          var r,
            n,
            a = t.vars.onOverwrite;
          return (
            a && (r = a(t, e, i, s)),
            (a = z.onOverwrite) && (n = a(t, e, i, s)),
            !1 !== r && !1 !== n
          );
        },
        et = function(t, e, i, s, r) {
          var n, a, o, l;
          if (1 === s || s >= 4) {
            for (l = r.length, n = 0; l > n; n++)
              if ((o = r[n]) !== e) o._gc || (o._kill(null, t, e) && (a = !0));
              else if (5 === s) break;
            return a;
          }
          var h,
            _ = e._startTime + p,
            u = [],
            f = 0,
            c = 0 === e._duration;
          for (n = r.length; --n > -1; )
            (o = r[n]) === e ||
              o._gc ||
              o._paused ||
              (o._timeline !== e._timeline
                ? ((h = h || it(e, 0, c)), 0 === it(o, h, c) && (u[f++] = o))
                : o._startTime <= _ &&
                  o._startTime + o.totalDuration() / o._timeScale > _ &&
                  (((c || !o._initted) && _ - o._startTime <= 2e-10) ||
                    (u[f++] = o)));
          for (n = f; --n > -1; )
            if (
              ((o = u[n]),
              2 === s && o._kill(i, t, e) && (a = !0),
              2 !== s || (!o._firstPT && o._initted))
            ) {
              if (2 !== s && !tt(o, e)) continue;
              o._enabled(!1, !1) && (a = !0);
            }
          return a;
        },
        it = function(t, e, i) {
          for (
            var s = t._timeline, r = s._timeScale, n = t._startTime;
            s._timeline;

          ) {
            if (((n += s._startTime), (r *= s._timeScale), s._paused))
              return -100;
            s = s._timeline;
          }
          return (n /= r) > e
            ? n - e
            : (i && n === e) || (!t._initted && 2 * p > n - e)
            ? p
            : (n += t.totalDuration() / t._timeScale / r) > e + p
            ? 0
            : n - e - p;
        };
      (h._init = function() {
        var t,
          e,
          i,
          s,
          r,
          n,
          a = this.vars,
          o = this._overwrittenProps,
          l = this._duration,
          h = !!a.immediateRender,
          _ = a.ease;
        if (a.startAt) {
          this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
            (r = {});
          for (s in a.startAt) r[s] = a.startAt[s];
          if (
            ((r.data = 'isStart'),
            (r.overwrite = !1),
            (r.immediateRender = !0),
            (r.lazy = h && !1 !== a.lazy),
            (r.startAt = r.delay = null),
            (r.onUpdate = a.onUpdate),
            (r.onUpdateParams = a.onUpdateParams),
            (r.onUpdateScope = a.onUpdateScope || a.callbackScope || this),
            (this._startAt = z.to(this.target, 0, r)),
            h)
          )
            if (this._time > 0) this._startAt = null;
            else if (0 !== l) return;
        } else if (a.runBackwards && 0 !== l)
          if (this._startAt)
            this._startAt.render(-1, !0),
              this._startAt.kill(),
              (this._startAt = null);
          else {
            0 !== this._time && (h = !1), (i = {});
            for (s in a) (G[s] && 'autoCSS' !== s) || (i[s] = a[s]);
            if (
              ((i.overwrite = 0),
              (i.data = 'isFromStart'),
              (i.lazy = h && !1 !== a.lazy),
              (i.immediateRender = h),
              (this._startAt = z.to(this.target, 0, i)),
              h)
            ) {
              if (0 === this._time) return;
            } else
              this._startAt._init(),
                this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null);
          }
        if (
          ((this._ease = _ = _
            ? _ instanceof w
              ? _
              : 'function' == typeof _
              ? new w(_, a.easeParams)
              : P[_] || z.defaultEase
            : z.defaultEase),
          a.easeParams instanceof Array &&
            _.config &&
            (this._ease = _.config.apply(_, a.easeParams)),
          (this._easeType = this._ease._type),
          (this._easePower = this._ease._power),
          (this._firstPT = null),
          this._targets)
        )
          for (n = this._targets.length, t = 0; n > t; t++)
            this._initProps(
              this._targets[t],
              (this._propLookup[t] = {}),
              this._siblings[t],
              o ? o[t] : null,
              t
            ) && (e = !0);
        else
          e = this._initProps(
            this.target,
            this._propLookup,
            this._siblings,
            o,
            0
          );
        if (
          (e && z._onPluginEvent('_onInitAllProps', this),
          o &&
            (this._firstPT ||
              ('function' != typeof this.target && this._enabled(!1, !1))),
          a.runBackwards)
        )
          for (i = this._firstPT; i; )
            (i.s += i.c), (i.c = -i.c), (i = i._next);
        (this._onUpdate = a.onUpdate), (this._initted = !0);
      }),
        (h._initProps = function(e, i, s, r, n) {
          var a, o, l, h, _, u;
          if (null == e) return !1;
          X[e._gsTweenID] && K(),
            this.vars.css ||
              (e.style &&
                e !== t &&
                e.nodeType &&
                V.css &&
                !1 !== this.vars.autoCSS &&
                (function(t, e) {
                  var i,
                    s = {};
                  for (i in t)
                    G[i] ||
                      (i in e &&
                        'transform' !== i &&
                        'x' !== i &&
                        'y' !== i &&
                        'width' !== i &&
                        'height' !== i &&
                        'className' !== i &&
                        'border' !== i) ||
                      !(!V[i] || (V[i] && V[i]._autoCSS)) ||
                      ((s[i] = t[i]), delete t[i]);
                  t.css = s;
                })(this.vars, e));
          for (a in this.vars)
            if (((u = this.vars[a]), G[a]))
              u &&
                (u instanceof Array || (u.push && g(u))) &&
                -1 !== u.join('').indexOf('{self}') &&
                (this.vars[a] = u = this._swapSelfInParams(u, this));
            else if (
              V[a] &&
              (h = new V[a]())._onInitTween(e, this.vars[a], this, n)
            ) {
              for (
                this._firstPT = _ = {
                  _next: this._firstPT,
                  t: h,
                  p: 'setRatio',
                  s: 0,
                  c: 1,
                  f: 1,
                  n: a,
                  pg: 1,
                  pr: h._priority,
                  m: 0
                },
                  o = h._overwriteProps.length;
                --o > -1;

              )
                i[h._overwriteProps[o]] = this._firstPT;
              (h._priority || h._onInitAllProps) && (l = !0),
                (h._onDisable || h._onEnable) &&
                  (this._notifyPluginsOfEnabled = !0),
                _._next && (_._next._prev = _);
            } else
              i[a] = j.call(
                this,
                e,
                a,
                'get',
                u,
                a,
                0,
                null,
                this.vars.stringFilter,
                n
              );
          return r && this._kill(r, e)
            ? this._initProps(e, i, s, r, n)
            : this._overwrite > 1 &&
              this._firstPT &&
              s.length > 1 &&
              et(e, this, i, this._overwrite, s)
            ? (this._kill(i, e), this._initProps(e, i, s, r, n))
            : (this._firstPT &&
                ((!1 !== this.vars.lazy && this._duration) ||
                  (this.vars.lazy && !this._duration)) &&
                (X[e._gsTweenID] = !0),
              l);
        }),
        (h.render = function(t, e, i) {
          var s,
            r,
            n,
            a,
            o = this._time,
            l = this._duration,
            h = this._rawPrevTime;
          if (t >= l - 1e-7 && t >= 0)
            (this._totalTime = this._time = l),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
              this._reversed ||
                ((s = !0),
                (r = 'onComplete'),
                (i = i || this._timeline.autoRemoveChildren)),
              0 === l &&
                (this._initted || !this.vars.lazy || i) &&
                (this._startTime === this._timeline._duration && (t = 0),
                (0 > h ||
                  (0 >= t && t >= -1e-7) ||
                  (h === p && 'isPause' !== this.data)) &&
                  h !== t &&
                  ((i = !0), h > p && (r = 'onReverseComplete')),
                (this._rawPrevTime = a = !e || t || h === t ? t : p));
          else if (1e-7 > t)
            (this._totalTime = this._time = 0),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
              (0 !== o || (0 === l && h > 0)) &&
                ((r = 'onReverseComplete'), (s = this._reversed)),
              0 > t &&
                ((this._active = !1),
                0 === l &&
                  (this._initted || !this.vars.lazy || i) &&
                  (h >= 0 && (h !== p || 'isPause' !== this.data) && (i = !0),
                  (this._rawPrevTime = a = !e || t || h === t ? t : p))),
              (!this._initted || (this._startAt && this._startAt.progress())) &&
                (i = !0);
          else if (((this._totalTime = this._time = t), this._easeType)) {
            var _ = t / l,
              u = this._easeType,
              f = this._easePower;
            (1 === u || (3 === u && _ >= 0.5)) && (_ = 1 - _),
              3 === u && (_ *= 2),
              1 === f
                ? (_ *= _)
                : 2 === f
                ? (_ *= _ * _)
                : 3 === f
                ? (_ *= _ * _ * _)
                : 4 === f && (_ *= _ * _ * _ * _),
              (this.ratio =
                1 === u
                  ? 1 - _
                  : 2 === u
                  ? _
                  : 0.5 > t / l
                  ? _ / 2
                  : 1 - _ / 2);
          } else this.ratio = this._ease.getRatio(t / l);
          if (this._time !== o || i) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !i &&
                this._firstPT &&
                ((!1 !== this.vars.lazy && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = this._totalTime = o),
                  (this._rawPrevTime = h),
                  I.push(this),
                  void (this._lazy = [t, e])
                );
              this._time && !s
                ? (this.ratio = this._ease.getRatio(this._time / l))
                : s &&
                  this._ease._calcEnd &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (
              !1 !== this._lazy && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== o &&
                    t >= 0 &&
                    (this._active = !0)),
                0 === o &&
                  (this._startAt &&
                    (t >= 0
                      ? this._startAt.render(t, !0, i)
                      : r || (r = '_dummyGS')),
                  this.vars.onStart &&
                    (0 !== this._time || 0 === l) &&
                    (e || this._callback('onStart'))),
                n = this._firstPT;
              n;

            )
              n.f
                ? n.t[n.p](n.c * this.ratio + n.s)
                : (n.t[n.p] = n.c * this.ratio + n.s),
                (n = n._next);
            this._onUpdate &&
              (0 > t &&
                this._startAt &&
                -1e-4 !== t &&
                this._startAt.render(t, !0, i),
              e ||
                ((this._time !== o || s || i) && this._callback('onUpdate'))),
              r &&
                (!this._gc || i) &&
                (0 > t &&
                  this._startAt &&
                  !this._onUpdate &&
                  -1e-4 !== t &&
                  this._startAt.render(t, !0, i),
                s &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !e && this.vars[r] && this._callback(r),
                0 === l &&
                  this._rawPrevTime === p &&
                  a !== p &&
                  (this._rawPrevTime = 0));
          }
        }),
        (h._kill = function(t, e, i) {
          if (
            ('all' === t && (t = null),
            null == t && (null == e || e === this.target))
          )
            return (this._lazy = !1), this._enabled(!1, !1);
          e =
            'string' != typeof e
              ? e || this._targets || this.target
              : z.selector(e) || e;
          var s,
            r,
            n,
            a,
            o,
            l,
            h,
            _,
            u,
            f =
              i &&
              this._time &&
              i._startTime === this._startTime &&
              this._timeline === i._timeline;
          if ((g(e) || E(e)) && 'number' != typeof e[0])
            for (s = e.length; --s > -1; ) this._kill(t, e[s], i) && (l = !0);
          else {
            if (this._targets) {
              for (s = this._targets.length; --s > -1; )
                if (e === this._targets[s]) {
                  (o = this._propLookup[s] || {}),
                    (this._overwrittenProps = this._overwrittenProps || []),
                    (r = this._overwrittenProps[s] = t
                      ? this._overwrittenProps[s] || {}
                      : 'all');
                  break;
                }
            } else {
              if (e !== this.target) return !1;
              (o = this._propLookup),
                (r = this._overwrittenProps = t
                  ? this._overwrittenProps || {}
                  : 'all');
            }
            if (o) {
              if (
                ((h = t || o),
                (_ =
                  t !== r &&
                  'all' !== r &&
                  t !== o &&
                  ('object' != typeof t || !t._tempKill)),
                i && (z.onOverwrite || this.vars.onOverwrite))
              ) {
                for (n in h) o[n] && (u || (u = []), u.push(n));
                if ((u || !t) && !tt(this, i, e, u)) return !1;
              }
              for (n in h)
                (a = o[n]) &&
                  (f && (a.f ? a.t[a.p](a.s) : (a.t[a.p] = a.s), (l = !0)),
                  a.pg && a.t._kill(h) && (l = !0),
                  (a.pg && 0 !== a.t._overwriteProps.length) ||
                    (a._prev
                      ? (a._prev._next = a._next)
                      : a === this._firstPT && (this._firstPT = a._next),
                    a._next && (a._next._prev = a._prev),
                    (a._next = a._prev = null)),
                  delete o[n]),
                  _ && (r[n] = 1);
              !this._firstPT && this._initted && this._enabled(!1, !1);
            }
          }
          return l;
        }),
        (h.invalidate = function() {
          return (
            this._notifyPluginsOfEnabled &&
              z._onPluginEvent('_onDisable', this),
            (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
            (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
            (this._propLookup = this._targets ? {} : []),
            D.prototype.invalidate.call(this),
            this.vars.immediateRender &&
              ((this._time = -p), this.render(Math.min(0, -this._delay))),
            this
          );
        }),
        (h._enabled = function(t, e) {
          if ((u || _.wake(), t && this._gc)) {
            var i,
              s = this._targets;
            if (s)
              for (i = s.length; --i > -1; )
                this._siblings[i] = J(s[i], this, !0);
            else this._siblings = J(this.target, this, !0);
          }
          return (
            D.prototype._enabled.call(this, t, e),
            !(!this._notifyPluginsOfEnabled || !this._firstPT) &&
              z._onPluginEvent(t ? '_onEnable' : '_onDisable', this)
          );
        }),
        (z.to = function(t, e, i) {
          return new z(t, e, i);
        }),
        (z.from = function(t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new z(t, e, i)
          );
        }),
        (z.fromTo = function(t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new z(t, e, s)
          );
        }),
        (z.delayedCall = function(t, e, i, s, r) {
          return new z(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            lazy: !1,
            useFrames: r,
            overwrite: 0
          });
        }),
        (z.set = function(t, e) {
          return new z(t, 0, e);
        }),
        (z.getTweensOf = function(t, e) {
          if (null == t) return [];
          var i, s, r, n;
          if (
            ((t = 'string' != typeof t ? t : z.selector(t) || t),
            (g(t) || E(t)) && 'number' != typeof t[0])
          ) {
            for (i = t.length, s = []; --i > -1; )
              s = s.concat(z.getTweensOf(t[i], e));
            for (i = s.length; --i > -1; )
              for (n = s[i], r = i; --r > -1; ) n === s[r] && s.splice(i, 1);
          } else if (t._gsTweenID)
            for (s = J(t).concat(), i = s.length; --i > -1; )
              (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
          return s || [];
        }),
        (z.killTweensOf = z.killDelayedCallsTo = function(t, e, i) {
          'object' == typeof e && ((i = e), (e = !1));
          for (var s = z.getTweensOf(t, e), r = s.length; --r > -1; )
            s[r]._kill(i, t);
        });
      var st = x(
        'plugins.TweenPlugin',
        function(t, e) {
          (this._overwriteProps = (t || '').split(',')),
            (this._propName = this._overwriteProps[0]),
            (this._priority = e || 0),
            (this._super = st.prototype);
        },
        !0
      );
      if (
        ((h = st.prototype),
        (st.version = '1.19.0'),
        (st.API = 2),
        (h._firstPT = null),
        (h._addTween = j),
        (h.setRatio = B),
        (h._kill = function(t) {
          var e,
            i = this._overwriteProps,
            s = this._firstPT;
          if (null != t[this._propName]) this._overwriteProps = [];
          else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
          for (; s; )
            null != t[s.n] &&
              (s._next && (s._next._prev = s._prev),
              s._prev
                ? ((s._prev._next = s._next), (s._prev = null))
                : this._firstPT === s && (this._firstPT = s._next)),
              (s = s._next);
          return !1;
        }),
        (h._mod = h._roundProps = function(t) {
          for (var e, i = this._firstPT; i; )
            (e =
              t[this._propName] ||
              (null != i.n && t[i.n.split(this._propName + '_').join('')])),
              e &&
                'function' == typeof e &&
                (2 === i.f ? (i.t._applyPT.m = e) : (i.m = e)),
              (i = i._next);
        }),
        (z._onPluginEvent = function(t, e) {
          var i,
            s,
            r,
            n,
            a,
            o = e._firstPT;
          if ('_onInitAllProps' === t) {
            for (; o; ) {
              for (a = o._next, s = r; s && s.pr > o.pr; ) s = s._next;
              (o._prev = s ? s._prev : n) ? (o._prev._next = o) : (r = o),
                (o._next = s) ? (s._prev = o) : (n = o),
                (o = a);
            }
            o = e._firstPT = r;
          }
          for (; o; )
            o.pg && 'function' == typeof o.t[t] && o.t[t]() && (i = !0),
              (o = o._next);
          return i;
        }),
        (st.activate = function(t) {
          for (var e = t.length; --e > -1; )
            t[e].API === st.API && (V[new t[e]()._propName] = t[e]);
          return !0;
        }),
        (T.plugin = function(t) {
          if (!(t && t.propName && t.init && t.API))
            throw 'illegal plugin definition.';
          var e,
            i = t.propName,
            s = t.priority || 0,
            r = t.overwriteProps,
            n = {
              init: '_onInitTween',
              set: 'setRatio',
              kill: '_kill',
              round: '_mod',
              mod: '_mod',
              initAll: '_onInitAllProps'
            },
            a = x(
              'plugins.' + i.charAt(0).toUpperCase() + i.substr(1) + 'Plugin',
              function() {
                st.call(this, i, s), (this._overwriteProps = r || []);
              },
              !0 === t.global
            ),
            o = (a.prototype = new st(i));
          (o.constructor = a), (a.API = t.API);
          for (e in n) 'function' == typeof t[e] && (o[n[e]] = t[e]);
          return (a.version = t.version), st.activate([a]), a;
        }),
        (o = t._gsQueue))
      ) {
        for (l = 0; l < o.length; l++) o[l]();
        for (h in y)
          y[h].func ||
            t.console.log('GSAP encountered missing dependency: ' + h);
      }
      u = !1;
    }
  })(
    'undefined' != typeof module &&
      module.exports &&
      'undefined' != typeof global
      ? global
      : this || window,
    'TweenMax'
  );
/*! Masonry */
(function(e, t, n) {
  'use strict';
  var r = t.event,
    i;
  (r.special.smartresize = {
    setup: function() {
      t(this).bind('resize', r.special.smartresize.handler);
    },
    teardown: function() {
      t(this).unbind('resize', r.special.smartresize.handler);
    },
    handler: function(e, t) {
      var n = this,
        s = arguments;
      (e.type = 'smartresize'),
        i && clearTimeout(i),
        (i = setTimeout(
          function() {
            r.dispatch.apply(n, s);
          },
          t === 'execAsap' ? 0 : 100
        ));
    }
  }),
    (t.fn.smartresize = function(e) {
      return e
        ? this.bind('smartresize', e)
        : this.trigger('smartresize', ['execAsap']);
    }),
    (t.Mason = function(e, n) {
      (this.element = t(n)), this._create(e), this._init();
    }),
    (t.Mason.settings = {
      isResizable: !0,
      isAnimated: !1,
      animationOptions: { queue: !1, duration: 500 },
      gutterWidth: 0,
      isRTL: !1,
      isFitWidth: !1,
      containerStyle: { position: 'relative' }
    }),
    (t.Mason.prototype = {
      _filterFindBricks: function(e) {
        var t = this.options.itemSelector;
        return t ? e.filter(t).add(e.find(t)) : e;
      },
      _getBricks: function(e) {
        var t = this._filterFindBricks(e)
          .css({ position: 'absolute' })
          .addClass('masonry-brick');
        return t;
      },
      _create: function(n) {
        (this.options = t.extend(!0, {}, t.Mason.settings, n)),
          (this.styleQueue = []);
        var r = this.element[0].style;
        this.originalStyle = { height: r.height || '' };
        var i = this.options.containerStyle;
        for (var s in i) this.originalStyle[s] = r[s] || '';
        this.element.css(i),
          (this.horizontalDirection = this.options.isRTL ? 'right' : 'left');
        var o = this.element.css('padding-' + this.horizontalDirection),
          u = this.element.css('padding-top');
        (this.offset = {
          x: o ? parseInt(o, 10) : 0,
          y: u ? parseInt(u, 10) : 0
        }),
          (this.isFluid =
            this.options.columnWidth &&
            typeof this.options.columnWidth == 'function');
        var a = this;
        setTimeout(function() {
          a.element.addClass('masonry');
        }, 0),
          this.options.isResizable &&
            t(e).bind('smartresize.masonry', function() {
              a.resize();
            }),
          this.reloadItems();
      },
      _init: function(e) {
        this._getColumns(), this._reLayout(e);
      },
      option: function(e, n) {
        t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
      },
      layout: function(e, t) {
        for (var n = 0, r = e.length; n < r; n++) this._placeBrick(e[n]);
        var i = {};
        i.height = Math.max.apply(Math, this.colYs);
        if (this.options.isFitWidth) {
          var s = 0;
          n = this.cols;
          while (--n) {
            if (this.colYs[n] !== 0) break;
            s++;
          }
          i.width =
            (this.cols - s) * this.columnWidth - this.options.gutterWidth;
        }
        this.styleQueue.push({ $el: this.element, style: i });
        var o = this.isLaidOut
            ? this.options.isAnimated
              ? 'animate'
              : 'css'
            : 'css',
          u = this.options.animationOptions,
          a;
        for (n = 0, r = this.styleQueue.length; n < r; n++)
          (a = this.styleQueue[n]), a.$el[o](a.style, u);
        (this.styleQueue = []), t && t.call(e), (this.isLaidOut = !0);
      },
      _getColumns: function() {
        var e = this.options.isFitWidth ? this.element.parent() : this.element,
          t = e.width();
        (this.columnWidth = this.isFluid
          ? this.options.columnWidth(t)
          : this.options.columnWidth || this.$bricks.outerWidth(!0) || t),
          (this.columnWidth += this.options.gutterWidth),
          (this.cols = Math.floor(
            (t + this.options.gutterWidth) / this.columnWidth
          )),
          (this.cols = Math.max(this.cols, 1));
      },
      _placeBrick: function(e) {
        var n = t(e),
          r,
          i,
          s,
          o,
          u;
        (r = Math.ceil(n.outerWidth(!0) / this.columnWidth)),
          (r = Math.min(r, this.cols));
        if (r === 1) s = this.colYs;
        else {
          (i = this.cols + 1 - r), (s = []);
          for (u = 0; u < i; u++)
            (o = this.colYs.slice(u, u + r)), (s[u] = Math.max.apply(Math, o));
        }
        var a = Math.min.apply(Math, s),
          f = 0;
        for (var l = 0, c = s.length; l < c; l++)
          if (s[l] === a) {
            f = l;
            break;
          }
        var h = { top: a + this.offset.y };
        (h[this.horizontalDirection] = this.columnWidth * f + this.offset.x),
          this.styleQueue.push({ $el: n, style: h });
        var p = a + n.outerHeight(!0),
          d = this.cols + 1 - c;
        for (l = 0; l < d; l++) this.colYs[f + l] = p;
      },
      resize: function() {
        var e = this.cols;
        this._getColumns(),
          (this.isFluid || this.cols !== e) && this._reLayout();
      },
      _reLayout: function(e) {
        var t = this.cols;
        this.colYs = [];
        while (t--) this.colYs.push(0);
        this.layout(this.$bricks, e);
      },
      reloadItems: function() {
        this.$bricks = this._getBricks(this.element.children());
      },
      reload: function(e) {
        this.reloadItems(), this._init(e);
      },
      appended: function(e, t, n) {
        if (t) {
          this._filterFindBricks(e).css({ top: this.element.height() });
          var r = this;
          setTimeout(function() {
            r._appended(e, n);
          }, 1);
        } else this._appended(e, n);
      },
      _appended: function(e, t) {
        var n = this._getBricks(e);
        (this.$bricks = this.$bricks.add(n)), this.layout(n, t);
      },
      remove: function(e) {
        (this.$bricks = this.$bricks.not(e)), e.remove();
      },
      destroy: function() {
        this.$bricks.removeClass('masonry-brick').each(function() {
          (this.style.position = ''),
            (this.style.top = ''),
            (this.style.left = '');
        });
        var n = this.element[0].style;
        for (var r in this.originalStyle) n[r] = this.originalStyle[r];
        this.element
          .unbind('.masonry')
          .removeClass('masonry')
          .removeData('masonry'),
          t(e).unbind('.masonry');
      }
    }),
    (t.fn.imagesLoaded = function(e) {
      function u() {
        e.call(n, r);
      }
      function a(e) {
        var n = e.target;
        n.src !== s &&
          t.inArray(n, o) === -1 &&
          (o.push(n),
          --i <= 0 && (setTimeout(u), r.unbind('.imagesLoaded', a)));
      }
      var n = this,
        r = n.find('img').add(n.filter('img')),
        i = r.length,
        s =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        o = [];
      return (
        i || u(),
        r.bind('load.imagesLoaded error.imagesLoaded', a).each(function() {
          var e = this.src;
          (this.src = s), (this.src = e);
        }),
        n
      );
    });
  var s = function(t) {
    e.console && e.console.error(t);
  };
  t.fn.masonry = function(e) {
    if (typeof e == 'string') {
      var n = Array.prototype.slice.call(arguments, 1);
      this.each(function() {
        var r = t.data(this, 'masonry');
        if (!r) {
          s(
            "cannot call methods on masonry prior to initialization; attempted to call method '" +
              e +
              "'"
          );
          return;
        }
        if (!t.isFunction(r[e]) || e.charAt(0) === '_') {
          s("no such method '" + e + "' for masonry instance");
          return;
        }
        r[e].apply(r, n);
      });
    } else
      this.each(function() {
        var n = t.data(this, 'masonry');
        n
          ? (n.option(e || {}), n._init())
          : t.data(this, 'masonry', new t.Mason(e, this));
      });
    return this;
  };
})(window, jQuery);
/*! Isotope */
(function(a, b, c) {
  'use strict';
  var d = a.document,
    e = a.Modernizr,
    f = function(a) {
      return a.charAt(0).toUpperCase() + a.slice(1);
    },
    g = 'Moz Webkit O Ms'.split(' '),
    h = function(a) {
      var b = d.documentElement.style,
        c;
      if (typeof b[a] == 'string') return a;
      a = f(a);
      for (var e = 0, h = g.length; e < h; e++) {
        c = g[e] + a;
        if (typeof b[c] == 'string') return c;
      }
    },
    i = h('transform'),
    j = h('transitionProperty'),
    k = {
      csstransforms: function() {
        return !!i;
      },
      csstransforms3d: function() {
        var a = !!h('perspective');
        if (a) {
          var c = ' -o- -moz- -ms- -webkit- -khtml- '.split(' '),
            d = '@media (' + c.join('transform-3d),(') + 'modernizr)',
            e = b(
              '<style>' + d + '{#modernizr{height:3px}}' + '</style>'
            ).appendTo('head'),
            f = b('<div id="modernizr" />').appendTo('html');
          (a = f.height() === 3), f.remove(), e.remove();
        }
        return a;
      },
      csstransitions: function() {
        return !!j;
      }
    },
    l;
  if (e) for (l in k) e.hasOwnProperty(l) || e.addTest(l, k[l]);
  else {
    e = a.Modernizr = { _version: '1.6ish: miniModernizr for Isotope' };
    var m = ' ',
      n;
    for (l in k) (n = k[l]()), (e[l] = n), (m += ' ' + (n ? '' : 'no-') + l);
    b('html').addClass(m);
  }
  if (e.csstransforms) {
    var o = e.csstransforms3d
        ? {
            translate: function(a) {
              return 'translate3d(' + a[0] + 'px, ' + a[1] + 'px, 0) ';
            },
            scale: function(a) {
              return 'scale3d(' + a + ', ' + a + ', 1) ';
            }
          }
        : {
            translate: function(a) {
              return 'translate(' + a[0] + 'px, ' + a[1] + 'px) ';
            },
            scale: function(a) {
              return 'scale(' + a + ') ';
            }
          },
      p = function(a, c, d) {
        var e = b.data(a, 'isoTransform') || {},
          f = {},
          g,
          h = {},
          j;
        (f[c] = d), b.extend(e, f);
        for (g in e) (j = e[g]), (h[g] = o[g](j));
        var k = h.translate || '',
          l = h.scale || '',
          m = k + l;
        b.data(a, 'isoTransform', e), (a.style[i] = m);
      };
    (b.cssNumber.scale = !0),
      (b.cssHooks.scale = {
        set: function(a, b) {
          p(a, 'scale', b);
        },
        get: function(a, c) {
          var d = b.data(a, 'isoTransform');
          return d && d.scale ? d.scale : 1;
        }
      }),
      (b.fx.step.scale = function(a) {
        b.cssHooks.scale.set(a.elem, a.now + a.unit);
      }),
      (b.cssNumber.translate = !0),
      (b.cssHooks.translate = {
        set: function(a, b) {
          p(a, 'translate', b);
        },
        get: function(a, c) {
          var d = b.data(a, 'isoTransform');
          return d && d.translate ? d.translate : [0, 0];
        }
      });
  }
  var q, r;
  e.csstransitions &&
    ((q = {
      WebkitTransitionProperty: 'webkitTransitionEnd',
      MozTransitionProperty: 'transitionend',
      OTransitionProperty: 'oTransitionEnd otransitionend',
      transitionProperty: 'transitionend'
    }[j]),
    (r = h('transitionDuration')));
  var s = b.event,
    t = b.event.handle ? 'handle' : 'dispatch',
    u;
  (s.special.smartresize = {
    setup: function() {
      b(this).bind('resize', s.special.smartresize.handler);
    },
    teardown: function() {
      b(this).unbind('resize', s.special.smartresize.handler);
    },
    handler: function(a, b) {
      var c = this,
        d = arguments;
      (a.type = 'smartresize'),
        u && clearTimeout(u),
        (u = setTimeout(
          function() {
            s[t].apply(c, d);
          },
          b === 'execAsap' ? 0 : 100
        ));
    }
  }),
    (b.fn.smartresize = function(a) {
      return a
        ? this.bind('smartresize', a)
        : this.trigger('smartresize', ['execAsap']);
    }),
    (b.Isotope = function(a, c, d) {
      (this.element = b(c)), this._create(a), this._init(d);
    });
  var v = ['width', 'height'],
    w = b(a);
  (b.Isotope.settings = {
    resizable: !0,
    layoutMode: 'masonry',
    containerClass: 'isotope',
    itemClass: 'isotope-item',
    hiddenClass: 'isotope-hidden',
    hiddenStyle: { opacity: 0, scale: 0.001 },
    visibleStyle: { opacity: 1, scale: 1 },
    containerStyle: { position: 'relative', overflow: 'hidden' },
    animationEngine: 'best-available',
    animationOptions: { queue: !1, duration: 800 },
    sortBy: 'original-order',
    sortAscending: !0,
    resizesContainer: !0,
    transformsEnabled: !0,
    itemPositionDataEnabled: !1
  }),
    (b.Isotope.prototype = {
      _create: function(a) {
        (this.options = b.extend({}, b.Isotope.settings, a)),
          (this.styleQueue = []),
          (this.elemCount = 0);
        var c = this.element[0].style;
        this.originalStyle = {};
        var d = v.slice(0);
        for (var e in this.options.containerStyle) d.push(e);
        for (var f = 0, g = d.length; f < g; f++)
          (e = d[f]), (this.originalStyle[e] = c[e] || '');
        this.element.css(this.options.containerStyle),
          this._updateAnimationEngine(),
          this._updateUsingTransforms();
        var h = {
          'original-order': function(a, b) {
            return b.elemCount++, b.elemCount;
          },
          random: function() {
            return Math.random();
          }
        };
        (this.options.getSortData = b.extend(this.options.getSortData, h)),
          this.reloadItems(),
          (this.offset = {
            left: parseInt(this.element.css('padding-left') || 0, 10),
            top: parseInt(this.element.css('padding-top') || 0, 10)
          });
        var i = this;
        setTimeout(function() {
          i.element.addClass(i.options.containerClass);
        }, 0),
          this.options.resizable &&
            w.bind('smartresize.isotope', function() {
              i.resize();
            }),
          this.element.delegate(
            '.' + this.options.hiddenClass,
            'click',
            function() {
              return !1;
            }
          );
      },
      _getAtoms: function(a) {
        var b = this.options.itemSelector,
          c = b ? a.filter(b).add(a.find(b)) : a,
          d = { position: 'absolute' };
        return (
          (c = c.filter(function(a, b) {
            return b.nodeType === 1;
          })),
          this.usingTransforms && ((d.left = 0), (d.top = 0)),
          c.css(d).addClass(this.options.itemClass),
          this.updateSortData(c, !0),
          c
        );
      },
      _init: function(a) {
        (this.$filteredAtoms = this._filter(this.$allAtoms)),
          this._sort(),
          this.reLayout(a);
      },
      option: function(a) {
        if (b.isPlainObject(a)) {
          this.options = b.extend(!0, this.options, a);
          var c;
          for (var d in a) (c = '_update' + f(d)), this[c] && this[c]();
        }
      },
      _updateAnimationEngine: function() {
        var a = this.options.animationEngine
            .toLowerCase()
            .replace(/[ _\-]/g, ''),
          b;
        switch (a) {
          case 'css':
          case 'none':
            b = !1;
            break;
          case 'jquery':
            b = !0;
            break;
          default:
            b = !e.csstransitions;
        }
        (this.isUsingJQueryAnimation = b), this._updateUsingTransforms();
      },
      _updateTransformsEnabled: function() {
        this._updateUsingTransforms();
      },
      _updateUsingTransforms: function() {
        var a = (this.usingTransforms =
          this.options.transformsEnabled &&
          e.csstransforms &&
          e.csstransitions &&
          !this.isUsingJQueryAnimation);
        a ||
          (delete this.options.hiddenStyle.scale,
          delete this.options.visibleStyle.scale),
          (this.getPositionStyles = a ? this._translate : this._positionAbs);
      },
      _filter: function(a) {
        var b = this.options.filter === '' ? '*' : this.options.filter;
        if (!b) return a;
        var c = this.options.hiddenClass,
          d = '.' + c,
          e = a.filter(d),
          f = e;
        if (b !== '*') {
          f = e.filter(b);
          var g = a
            .not(d)
            .not(b)
            .addClass(c);
          this.styleQueue.push({ $el: g, style: this.options.hiddenStyle });
        }
        return (
          this.styleQueue.push({ $el: f, style: this.options.visibleStyle }),
          f.removeClass(c),
          a.filter(b)
        );
      },
      updateSortData: function(a, c) {
        var d = this,
          e = this.options.getSortData,
          f,
          g;
        a.each(function() {
          (f = b(this)), (g = {});
          for (var a in e)
            !c && a === 'original-order'
              ? (g[a] = b.data(this, 'isotope-sort-data')[a])
              : (g[a] = e[a](f, d));
          b.data(this, 'isotope-sort-data', g);
        });
      },
      _sort: function() {
        var a = this.options.sortBy,
          b = this._getSorter,
          c = this.options.sortAscending ? 1 : -1,
          d = function(d, e) {
            var f = b(d, a),
              g = b(e, a);
            return (
              f === g &&
                a !== 'original-order' &&
                ((f = b(d, 'original-order')), (g = b(e, 'original-order'))),
              (f > g ? 1 : f < g ? -1 : 0) * c
            );
          };
        this.$filteredAtoms.sort(d);
      },
      _getSorter: function(a, c) {
        return b.data(a, 'isotope-sort-data')[c];
      },
      _translate: function(a, b) {
        return { translate: [a, b] };
      },
      _positionAbs: function(a, b) {
        return { left: a, top: b };
      },
      _pushPosition: function(a, b, c) {
        (b = Math.round(b + this.offset.left)),
          (c = Math.round(c + this.offset.top));
        var d = this.getPositionStyles(b, c);
        this.styleQueue.push({ $el: a, style: d }),
          this.options.itemPositionDataEnabled &&
            a.data('isotope-item-position', { x: b, y: c });
      },
      layout: function(a, b) {
        var c = this.options.layoutMode;
        this['_' + c + 'Layout'](a);
        if (this.options.resizesContainer) {
          var d = this['_' + c + 'GetContainerSize']();
          this.styleQueue.push({ $el: this.element, style: d });
        }
        this._processStyleQueue(a, b), (this.isLaidOut = !0);
      },
      _processStyleQueue: function(a, c) {
        var d = this.isLaidOut
            ? this.isUsingJQueryAnimation
              ? 'animate'
              : 'css'
            : 'css',
          f = this.options.animationOptions,
          g = this.options.onLayout,
          h,
          i,
          j,
          k;
        i = function(a, b) {
          b.$el[d](b.style, f);
        };
        if (this._isInserting && this.isUsingJQueryAnimation)
          i = function(a, b) {
            (h = b.$el.hasClass('no-transition') ? 'css' : d),
              b.$el[h](b.style, f);
          };
        else if (c || g || f.complete) {
          var l = !1,
            m = [c, g, f.complete],
            n = this;
          (j = !0),
            (k = function() {
              if (l) return;
              var b;
              for (var c = 0, d = m.length; c < d; c++)
                (b = m[c]), typeof b == 'function' && b.call(n.element, a, n);
              l = !0;
            });
          if (this.isUsingJQueryAnimation && d === 'animate')
            (f.complete = k), (j = !1);
          else if (e.csstransitions) {
            var o = 0,
              p = this.styleQueue[0],
              s = p && p.$el,
              t;
            while (!s || !s.length) {
              t = this.styleQueue[o++];
              if (!t) return;
              s = t.$el;
            }
            var u = parseFloat(getComputedStyle(s[0])[r]);
            u > 0 &&
              ((i = function(a, b) {
                b.$el[d](b.style, f).one(q, k);
              }),
              (j = !1));
          }
        }
        b.each(this.styleQueue, i), j && k(), (this.styleQueue = []);
      },
      resize: function() {
        this['_' + this.options.layoutMode + 'ResizeChanged']() &&
          this.reLayout();
      },
      reLayout: function(a) {
        this['_' + this.options.layoutMode + 'Reset'](),
          this.layout(this.$filteredAtoms, a);
      },
      addItems: function(a, b) {
        var c = this._getAtoms(a);
        (this.$allAtoms = this.$allAtoms.add(c)), b && b(c);
      },
      insert: function(a, b) {
        this.element.append(a);
        var c = this;
        this.addItems(a, function(a) {
          var d = c._filter(a);
          c._addHideAppended(d),
            c._sort(),
            c.reLayout(),
            c._revealAppended(d, b);
        });
      },
      appended: function(a, b) {
        var c = this;
        this.addItems(a, function(a) {
          c._addHideAppended(a), c.layout(a), c._revealAppended(a, b);
        });
      },
      _addHideAppended: function(a) {
        (this.$filteredAtoms = this.$filteredAtoms.add(a)),
          a.addClass('no-transition'),
          (this._isInserting = !0),
          this.styleQueue.push({ $el: a, style: this.options.hiddenStyle });
      },
      _revealAppended: function(a, b) {
        var c = this;
        setTimeout(function() {
          a.removeClass('no-transition'),
            c.styleQueue.push({ $el: a, style: c.options.visibleStyle }),
            (c._isInserting = !1),
            c._processStyleQueue(a, b);
        }, 10);
      },
      reloadItems: function() {
        this.$allAtoms = this._getAtoms(this.element.children());
      },
      remove: function(a, b) {
        (this.$allAtoms = this.$allAtoms.not(a)),
          (this.$filteredAtoms = this.$filteredAtoms.not(a));
        var c = this,
          d = function() {
            a.remove(), b && b.call(c.element);
          };
        a.filter(':not(.' + this.options.hiddenClass + ')').length
          ? (this.styleQueue.push({ $el: a, style: this.options.hiddenStyle }),
            this._sort(),
            this.reLayout(d))
          : d();
      },
      shuffle: function(a) {
        this.updateSortData(this.$allAtoms),
          (this.options.sortBy = 'random'),
          this._sort(),
          this.reLayout(a);
      },
      destroy: function() {
        var a = this.usingTransforms,
          b = this.options;
        this.$allAtoms
          .removeClass(b.hiddenClass + ' ' + b.itemClass)
          .each(function() {
            var b = this.style;
            (b.position = ''),
              (b.top = ''),
              (b.left = ''),
              (b.opacity = ''),
              a && (b[i] = '');
          });
        var c = this.element[0].style;
        for (var d in this.originalStyle) c[d] = this.originalStyle[d];
        this.element
          .unbind('.isotope')
          .undelegate('.' + b.hiddenClass, 'click')
          .removeClass(b.containerClass)
          .removeData('isotope'),
          w.unbind('.isotope');
      },
      _getSegments: function(a) {
        var b = this.options.layoutMode,
          c = a ? 'rowHeight' : 'columnWidth',
          d = a ? 'height' : 'width',
          e = a ? 'rows' : 'cols',
          g = this.element[d](),
          h,
          i =
            (this.options[b] && this.options[b][c]) ||
            this.$filteredAtoms['outer' + f(d)](!0) ||
            g;
        (h = Math.floor(g / i)),
          (h = Math.max(h, 1)),
          (this[b][e] = h),
          (this[b][c] = i);
      },
      _checkIfSegmentsChanged: function(a) {
        var b = this.options.layoutMode,
          c = a ? 'rows' : 'cols',
          d = this[b][c];
        return this._getSegments(a), this[b][c] !== d;
      },
      _masonryReset: function() {
        (this.masonry = {}), this._getSegments();
        var a = this.masonry.cols;
        this.masonry.colYs = [];
        while (a--) this.masonry.colYs.push(0);
      },
      _masonryLayout: function(a) {
        var c = this,
          d = c.masonry;
        a.each(function() {
          var a = b(this),
            e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
          e = Math.min(e, d.cols);
          if (e === 1) c._masonryPlaceBrick(a, d.colYs);
          else {
            var f = d.cols + 1 - e,
              g = [],
              h,
              i;
            for (i = 0; i < f; i++)
              (h = d.colYs.slice(i, i + e)), (g[i] = Math.max.apply(Math, h));
            c._masonryPlaceBrick(a, g);
          }
        });
      },
      _masonryPlaceBrick: function(a, b) {
        var c = Math.min.apply(Math, b),
          d = 0;
        for (var e = 0, f = b.length; e < f; e++)
          if (b[e] === c) {
            d = e;
            break;
          }
        var g = this.masonry.columnWidth * d,
          h = c;
        this._pushPosition(a, g, h);
        var i = c + a.outerHeight(!0),
          j = this.masonry.cols + 1 - f;
        for (e = 0; e < j; e++) this.masonry.colYs[d + e] = i;
      },
      _masonryGetContainerSize: function() {
        var a = Math.max.apply(Math, this.masonry.colYs);
        return { height: a };
      },
      _masonryResizeChanged: function() {
        return this._checkIfSegmentsChanged();
      },
      _fitRowsReset: function() {
        this.fitRows = { x: 0, y: 0, height: 0 };
      },
      _fitRowsLayout: function(a) {
        var c = this,
          d = this.element.width(),
          e = this.fitRows;
        a.each(function() {
          var a = b(this),
            f = a.outerWidth(!0),
            g = a.outerHeight(!0);
          e.x !== 0 && f + e.x > d && ((e.x = 0), (e.y = e.height)),
            c._pushPosition(a, e.x, e.y),
            (e.height = Math.max(e.y + g, e.height)),
            (e.x += f);
        });
      },
      _fitRowsGetContainerSize: function() {
        return { height: this.fitRows.height };
      },
      _fitRowsResizeChanged: function() {
        return !0;
      },
      _cellsByRowReset: function() {
        (this.cellsByRow = { index: 0 }),
          this._getSegments(),
          this._getSegments(!0);
      },
      _cellsByRowLayout: function(a) {
        var c = this,
          d = this.cellsByRow;
        a.each(function() {
          var a = b(this),
            e = d.index % d.cols,
            f = Math.floor(d.index / d.cols),
            g = (e + 0.5) * d.columnWidth - a.outerWidth(!0) / 2,
            h = (f + 0.5) * d.rowHeight - a.outerHeight(!0) / 2;
          c._pushPosition(a, g, h), d.index++;
        });
      },
      _cellsByRowGetContainerSize: function() {
        return {
          height:
            Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) *
              this.cellsByRow.rowHeight +
            this.offset.top
        };
      },
      _cellsByRowResizeChanged: function() {
        return this._checkIfSegmentsChanged();
      },
      _straightDownReset: function() {
        this.straightDown = { y: 0 };
      },
      _straightDownLayout: function(a) {
        var c = this;
        a.each(function(a) {
          var d = b(this);
          c._pushPosition(d, 0, c.straightDown.y),
            (c.straightDown.y += d.outerHeight(!0));
        });
      },
      _straightDownGetContainerSize: function() {
        return { height: this.straightDown.y };
      },
      _straightDownResizeChanged: function() {
        return !0;
      },
      _masonryHorizontalReset: function() {
        (this.masonryHorizontal = {}), this._getSegments(!0);
        var a = this.masonryHorizontal.rows;
        this.masonryHorizontal.rowXs = [];
        while (a--) this.masonryHorizontal.rowXs.push(0);
      },
      _masonryHorizontalLayout: function(a) {
        var c = this,
          d = c.masonryHorizontal;
        a.each(function() {
          var a = b(this),
            e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
          e = Math.min(e, d.rows);
          if (e === 1) c._masonryHorizontalPlaceBrick(a, d.rowXs);
          else {
            var f = d.rows + 1 - e,
              g = [],
              h,
              i;
            for (i = 0; i < f; i++)
              (h = d.rowXs.slice(i, i + e)), (g[i] = Math.max.apply(Math, h));
            c._masonryHorizontalPlaceBrick(a, g);
          }
        });
      },
      _masonryHorizontalPlaceBrick: function(a, b) {
        var c = Math.min.apply(Math, b),
          d = 0;
        for (var e = 0, f = b.length; e < f; e++)
          if (b[e] === c) {
            d = e;
            break;
          }
        var g = c,
          h = this.masonryHorizontal.rowHeight * d;
        this._pushPosition(a, g, h);
        var i = c + a.outerWidth(!0),
          j = this.masonryHorizontal.rows + 1 - f;
        for (e = 0; e < j; e++) this.masonryHorizontal.rowXs[d + e] = i;
      },
      _masonryHorizontalGetContainerSize: function() {
        var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
        return { width: a };
      },
      _masonryHorizontalResizeChanged: function() {
        return this._checkIfSegmentsChanged(!0);
      },
      _fitColumnsReset: function() {
        this.fitColumns = { x: 0, y: 0, width: 0 };
      },
      _fitColumnsLayout: function(a) {
        var c = this,
          d = this.element.height(),
          e = this.fitColumns;
        a.each(function() {
          var a = b(this),
            f = a.outerWidth(!0),
            g = a.outerHeight(!0);
          e.y !== 0 && g + e.y > d && ((e.x = e.width), (e.y = 0)),
            c._pushPosition(a, e.x, e.y),
            (e.width = Math.max(e.x + f, e.width)),
            (e.y += g);
        });
      },
      _fitColumnsGetContainerSize: function() {
        return { width: this.fitColumns.width };
      },
      _fitColumnsResizeChanged: function() {
        return !0;
      },
      _cellsByColumnReset: function() {
        (this.cellsByColumn = { index: 0 }),
          this._getSegments(),
          this._getSegments(!0);
      },
      _cellsByColumnLayout: function(a) {
        var c = this,
          d = this.cellsByColumn;
        a.each(function() {
          var a = b(this),
            e = Math.floor(d.index / d.rows),
            f = d.index % d.rows,
            g = (e + 0.5) * d.columnWidth - a.outerWidth(!0) / 2,
            h = (f + 0.5) * d.rowHeight - a.outerHeight(!0) / 2;
          c._pushPosition(a, g, h), d.index++;
        });
      },
      _cellsByColumnGetContainerSize: function() {
        return {
          width:
            Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) *
            this.cellsByColumn.columnWidth
        };
      },
      _cellsByColumnResizeChanged: function() {
        return this._checkIfSegmentsChanged(!0);
      },
      _straightAcrossReset: function() {
        this.straightAcross = { x: 0 };
      },
      _straightAcrossLayout: function(a) {
        var c = this;
        a.each(function(a) {
          var d = b(this);
          c._pushPosition(d, c.straightAcross.x, 0),
            (c.straightAcross.x += d.outerWidth(!0));
        });
      },
      _straightAcrossGetContainerSize: function() {
        return { width: this.straightAcross.x };
      },
      _straightAcrossResizeChanged: function() {
        return !0;
      }
    }),
    (b.fn.imagesLoaded = function(a) {
      function h() {
        a.call(c, d);
      }
      function i(a) {
        var c = a.target;
        c.src !== f &&
          b.inArray(c, g) === -1 &&
          (g.push(c),
          --e <= 0 && (setTimeout(h), d.unbind('.imagesLoaded', i)));
      }
      var c = this,
        d = c.find('img').add(c.filter('img')),
        e = d.length,
        f =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        g = [];
      return (
        e || h(),
        d.bind('load.imagesLoaded error.imagesLoaded', i).each(function() {
          var a = this.src;
          (this.src = f), (this.src = a);
        }),
        c
      );
    });
  var x = function(b) {
    a.console && a.console.error(b);
  };
  b.fn.isotope = function(a, c) {
    if (typeof a == 'string') {
      var d = Array.prototype.slice.call(arguments, 1);
      this.each(function() {
        var c = b.data(this, 'isotope');
        if (!c) {
          x(
            "cannot call methods on isotope prior to initialization; attempted to call method '" +
              a +
              "'"
          );
          return;
        }
        if (!b.isFunction(c[a]) || a.charAt(0) === '_') {
          x("no such method '" + a + "' for isotope instance");
          return;
        }
        c[a].apply(c, d);
      });
    } else
      this.each(function() {
        var d = b.data(this, 'isotope');
        d
          ? (d.option(a), d._init(c))
          : b.data(this, 'isotope', new b.Isotope(a, this, c));
      });
    return this;
  };
})(window, jQuery);
/*! fancyBox  */

!(function(t, e, n, o) {
  'use strict';
  function i(t) {
    var e = t.currentTarget,
      o = t.data ? t.data.options : {},
      i = o.selector ? n(o.selector) : t.data ? t.data.items : [],
      a = n(e).attr('data-fancybox') || '',
      s = 0,
      r = n.fancybox.getInstance();
    t.preventDefault(),
      (r && r.current.opts.$orig.is(e)) ||
        (a
          ? ((i = i.length
              ? i.filter('[data-fancybox="' + a + '"]')
              : n('[data-fancybox="' + a + '"]')),
            (s = i.index(e)),
            s < 0 && (s = 0))
          : (i = [e]),
        n.fancybox.open(i, o, s));
  }
  if (n) {
    if (n.fn.fancybox) return void n.error('fancyBox already initialized');
    var a = {
        loop: !1,
        margin: [44, 0],
        gutter: 50,
        keyboard: !0,
        arrows: !0,
        infobar: !1,
        toolbar: !0,
        buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],
        idleTime: 4,
        smallBtn: 'auto',
        protect: !1,
        modal: !1,
        image: { preload: 'auto' },
        ajax: { settings: { data: { fancybox: !0 } } },
        iframe: {
          tpl:
            '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
          preload: !0,
          css: {},
          attr: { scrolling: 'auto' }
        },
        animationEffect: 'zoom',
        animationDuration: 366,
        zoomOpacity: 'auto',
        transitionEffect: 'fade',
        transitionDuration: 366,
        slideClass: '',
        baseClass: '',
        baseTpl:
          '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button><div class="fancybox-infobar__body"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button></div><div class="fancybox-toolbar">{{BUTTONS}}</div><div class="fancybox-navigation"><button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" /><button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" /></div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
        btnTpl: {
          slideShow:
            '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
          fullScreen:
            '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
          thumbs:
            '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
          close:
            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
          smallBtn:
            '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>'
        },
        parentEl: 'body',
        autoFocus: !0,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: { autoStart: !1 },
        touch: { vertical: !0, momentum: !0 },
        hash: null,
        media: {},
        slideShow: { autoStart: !1, speed: 4e3 },
        thumbs: { autoStart: !1, hideOnClose: !0 },
        onInit: n.noop,
        beforeLoad: n.noop,
        afterLoad: n.noop,
        beforeShow: n.noop,
        afterShow: n.noop,
        beforeClose: n.noop,
        afterClose: n.noop,
        onActivate: n.noop,
        onDeactivate: n.noop,
        clickContent: function(t, e) {
          return 'image' === t.type && 'zoom';
        },
        clickSlide: 'close',
        clickOutside: 'close',
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          clickContent: function(t, e) {
            return 'image' === t.type && 'toggleControls';
          },
          clickSlide: function(t, e) {
            return 'image' === t.type ? 'toggleControls' : 'close';
          },
          dblclickContent: function(t, e) {
            return 'image' === t.type && 'zoom';
          },
          dblclickSlide: function(t, e) {
            return 'image' === t.type && 'zoom';
          }
        },
        lang: 'en',
        i18n: {
          en: {
            CLOSE: 'Close',
            NEXT: 'Next',
            PREV: 'Previous',
            ERROR:
              'The requested content cannot be loaded. <br/> Please try again later.',
            PLAY_START: 'Start slideshow',
            PLAY_STOP: 'Pause slideshow',
            FULL_SCREEN: 'Full screen',
            THUMBS: 'Thumbnails'
          },
          de: {
            CLOSE: 'Schliessen',
            NEXT: 'Weiter',
            PREV: 'Zurück',
            ERROR:
              'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.',
            PLAY_START: 'Diaschau starten',
            PLAY_STOP: 'Diaschau beenden',
            FULL_SCREEN: 'Vollbild',
            THUMBS: 'Vorschaubilder'
          }
        }
      },
      s = n(t),
      r = n(e),
      c = 0,
      l = function(t) {
        return t && t.hasOwnProperty && t instanceof n;
      },
      u = (function() {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function(e) {
            return t.setTimeout(e, 1e3 / 60);
          }
        );
      })(),
      d = (function() {
        var t,
          n = e.createElement('fakeelement'),
          i = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
          };
        for (t in i) if (n.style[t] !== o) return i[t];
      })(),
      f = function(t) {
        return t && t.length && t[0].offsetHeight;
      },
      h = function(t, o, i) {
        var s = this;
        (s.opts = n.extend(!0, { index: i }, a, o || {})),
          o && n.isArray(o.buttons) && (s.opts.buttons = o.buttons),
          (s.id = s.opts.id || ++c),
          (s.group = []),
          (s.currIndex = parseInt(s.opts.index, 10) || 0),
          (s.prevIndex = null),
          (s.prevPos = null),
          (s.currPos = 0),
          (s.firstRun = null),
          s.createGroup(t),
          s.group.length &&
            ((s.$lastFocus = n(e.activeElement).blur()),
            (s.slides = {}),
            s.init(t));
      };
    n.extend(h.prototype, {
      init: function() {
        var t,
          e,
          o,
          i = this,
          a = i.group[i.currIndex].opts;
        (i.scrollTop = r.scrollTop()),
          (i.scrollLeft = r.scrollLeft()),
          n.fancybox.getInstance() ||
            n.fancybox.isMobile ||
            'hidden' === n('body').css('overflow') ||
            ((t = n('body').width()),
            n('html').addClass('fancybox-enabled'),
            (t = n('body').width() - t),
            t > 1 &&
              n('head').append(
                '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' +
                  t +
                  'px; }</style>'
              )),
          (o = ''),
          n.each(a.buttons, function(t, e) {
            o += a.btnTpl[e] || '';
          }),
          (e = n(i.translate(i, a.baseTpl.replace('{{BUTTONS}}', o)))
            .addClass('fancybox-is-hidden')
            .attr('id', 'fancybox-container-' + i.id)
            .addClass(a.baseClass)
            .data('FancyBox', i)
            .prependTo(a.parentEl)),
          (i.$refs = { container: e }),
          ['bg', 'inner', 'infobar', 'toolbar', 'stage', 'caption'].forEach(
            function(t) {
              i.$refs[t] = e.find('.fancybox-' + t);
            }
          ),
          (!a.arrows || i.group.length < 2) &&
            e.find('.fancybox-navigation').remove(),
          a.infobar || i.$refs.infobar.remove(),
          a.toolbar || i.$refs.toolbar.remove(),
          i.trigger('onInit'),
          i.activate(),
          i.jumpTo(i.currIndex);
      },
      translate: function(t, e) {
        var n = t.opts.i18n[t.opts.lang];
        return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
          var i = n[e];
          return i === o ? t : i;
        });
      },
      createGroup: function(t) {
        var e = this,
          i = n.makeArray(t);
        n.each(i, function(t, i) {
          var a,
            s,
            r,
            c,
            l = {},
            u = {},
            d = [];
          n.isPlainObject(i)
            ? ((l = i), (u = i.opts || i))
            : 'object' === n.type(i) && n(i).length
            ? ((a = n(i)),
              (d = a.data()),
              (u = 'options' in d ? d.options : {}),
              (u = 'object' === n.type(u) ? u : {}),
              (l.src = 'src' in d ? d.src : u.src || a.attr('href')),
              ['width', 'height', 'thumb', 'type', 'filter'].forEach(function(
                t
              ) {
                t in d && (u[t] = d[t]);
              }),
              'srcset' in d && (u.image = { srcset: d.srcset }),
              (u.$orig = a),
              l.type || l.src || ((l.type = 'inline'), (l.src = i)))
            : (l = { type: 'html', src: i + '' }),
            (l.opts = n.extend(!0, {}, e.opts, u)),
            n.fancybox.isMobile &&
              (l.opts = n.extend(!0, {}, l.opts, l.opts.mobile)),
            (s = l.type || l.opts.type),
            (r = l.src || ''),
            !s &&
              r &&
              (r.match(
                /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
              )
                ? (s = 'image')
                : r.match(/\.(pdf)((\?|#).*)?$/i)
                ? (s = 'pdf')
                : '#' === r.charAt(0) && (s = 'inline')),
            (l.type = s),
            (l.index = e.group.length),
            l.opts.$orig && !l.opts.$orig.length && delete l.opts.$orig,
            !l.opts.$thumb &&
              l.opts.$orig &&
              (l.opts.$thumb = l.opts.$orig.find('img:first')),
            l.opts.$thumb && !l.opts.$thumb.length && delete l.opts.$thumb,
            'function' === n.type(l.opts.caption)
              ? (l.opts.caption = l.opts.caption.apply(i, [e, l]))
              : 'caption' in d && (l.opts.caption = d.caption),
            (l.opts.caption = l.opts.caption === o ? '' : l.opts.caption + ''),
            'ajax' === s &&
              ((c = r.split(/\s+/, 2)),
              c.length > 1 &&
                ((l.src = c.shift()), (l.opts.filter = c.shift()))),
            'auto' == l.opts.smallBtn &&
              (n.inArray(s, ['html', 'inline', 'ajax']) > -1
                ? ((l.opts.toolbar = !1), (l.opts.smallBtn = !0))
                : (l.opts.smallBtn = !1)),
            'pdf' === s && ((l.type = 'iframe'), (l.opts.iframe.preload = !1)),
            l.opts.modal &&
              (l.opts = n.extend(!0, l.opts, {
                infobar: 0,
                toolbar: 0,
                smallBtn: 0,
                keyboard: 0,
                slideShow: 0,
                fullScreen: 0,
                thumbs: 0,
                touch: 0,
                clickContent: !1,
                clickSlide: !1,
                clickOutside: !1,
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1
              })),
            e.group.push(l);
        });
      },
      addEvents: function() {
        var o = this;
        o.removeEvents(),
          o.$refs.container
            .on('click.fb-close', '[data-fancybox-close]', function(t) {
              t.stopPropagation(), t.preventDefault(), o.close(t);
            })
            .on(
              'click.fb-prev touchend.fb-prev',
              '[data-fancybox-prev]',
              function(t) {
                t.stopPropagation(), t.preventDefault(), o.previous();
              }
            )
            .on(
              'click.fb-next touchend.fb-next',
              '[data-fancybox-next]',
              function(t) {
                t.stopPropagation(), t.preventDefault(), o.next();
              }
            ),
          s.on('orientationchange.fb resize.fb', function(t) {
            t && t.originalEvent && 'resize' === t.originalEvent.type
              ? u(function() {
                  o.update();
                })
              : (o.$refs.stage.hide(),
                setTimeout(function() {
                  o.$refs.stage.show(), o.update();
                }, 500));
          }),
          r.on('focusin.fb', function(t) {
            var i = n.fancybox ? n.fancybox.getInstance() : null;
            i.isClosing ||
              !i.current ||
              !i.current.opts.trapFocus ||
              n(t.target).hasClass('fancybox-container') ||
              n(t.target).is(e) ||
              (i &&
                'fixed' !== n(t.target).css('position') &&
                !i.$refs.container.has(t.target).length &&
                (t.stopPropagation(),
                i.focus(),
                s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft)));
          }),
          r.on('keydown.fb', function(t) {
            var e = o.current,
              i = t.keyCode || t.which;
            if (
              e &&
              e.opts.keyboard &&
              !n(t.target).is('input') &&
              !n(t.target).is('textarea')
            )
              return 8 === i || 27 === i
                ? (t.preventDefault(), void o.close(t))
                : 37 === i || 38 === i
                ? (t.preventDefault(), void o.previous())
                : 39 === i || 40 === i
                ? (t.preventDefault(), void o.next())
                : void o.trigger('afterKeydown', t, i);
          }),
          o.group[o.currIndex].opts.idleTime &&
            ((o.idleSecondsCounter = 0),
            r.on(
              'mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle',
              function() {
                (o.idleSecondsCounter = 0),
                  o.isIdle && o.showControls(),
                  (o.isIdle = !1);
              }
            ),
            (o.idleInterval = t.setInterval(function() {
              o.idleSecondsCounter++,
                o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime &&
                  ((o.isIdle = !0),
                  (o.idleSecondsCounter = 0),
                  o.hideControls());
            }, 1e3)));
      },
      removeEvents: function() {
        var e = this;
        s.off('orientationchange.fb resize.fb'),
          r.off('focusin.fb keydown.fb .fb-idle'),
          this.$refs.container.off('.fb-close .fb-prev .fb-next'),
          e.idleInterval &&
            (t.clearInterval(e.idleInterval), (e.idleInterval = null));
      },
      previous: function(t) {
        return this.jumpTo(this.currPos - 1, t);
      },
      next: function(t) {
        return this.jumpTo(this.currPos + 1, t);
      },
      jumpTo: function(t, e, i) {
        var a,
          s,
          r,
          c,
          l,
          u,
          d,
          h = this,
          p = h.group.length;
        if (!(h.isSliding || h.isClosing || (h.isAnimating && h.firstRun))) {
          if (
            ((t = parseInt(t, 10)),
            (s = h.current ? h.current.opts.loop : h.opts.loop),
            !s && (t < 0 || t >= p))
          )
            return !1;
          if (
            ((a = h.firstRun = null === h.firstRun),
            !(p < 2 && !a && h.isSliding))
          ) {
            if (
              ((c = h.current),
              (h.prevIndex = h.currIndex),
              (h.prevPos = h.currPos),
              (r = h.createSlide(t)),
              p > 1 &&
                ((s || r.index > 0) && h.createSlide(t - 1),
                (s || r.index < p - 1) && h.createSlide(t + 1)),
              (h.current = r),
              (h.currIndex = r.index),
              (h.currPos = r.pos),
              h.trigger('beforeShow', a),
              h.updateControls(),
              (u = n.fancybox.getTranslate(r.$slide)),
              (r.isMoved =
                (0 !== u.left || 0 !== u.top) &&
                !r.$slide.hasClass('fancybox-animated')),
              (r.forcedDuration = o),
              n.isNumeric(e)
                ? (r.forcedDuration = e)
                : (e = r.opts[a ? 'animationDuration' : 'transitionDuration']),
              (e = parseInt(e, 10)),
              a)
            )
              return (
                r.opts.animationEffect &&
                  e &&
                  h.$refs.container.css('transition-duration', e + 'ms'),
                h.$refs.container.removeClass('fancybox-is-hidden'),
                f(h.$refs.container),
                h.$refs.container.addClass('fancybox-is-open'),
                r.$slide.addClass('fancybox-slide--current'),
                h.loadSlide(r),
                void h.preload()
              );
            n.each(h.slides, function(t, e) {
              n.fancybox.stop(e.$slide);
            }),
              r.$slide
                .removeClass('fancybox-slide--next fancybox-slide--previous')
                .addClass('fancybox-slide--current'),
              r.isMoved
                ? ((l = Math.round(r.$slide.width())),
                  n.each(h.slides, function(t, o) {
                    var i = o.pos - r.pos;
                    n.fancybox.animate(
                      o.$slide,
                      { top: 0, left: i * l + i * o.opts.gutter },
                      e,
                      function() {
                        o.$slide
                          .removeAttr('style')
                          .removeClass(
                            'fancybox-slide--next fancybox-slide--previous'
                          ),
                          o.pos === h.currPos &&
                            ((r.isMoved = !1), h.complete());
                      }
                    );
                  }))
                : h.$refs.stage.children().removeAttr('style'),
              r.isLoaded ? h.revealContent(r) : h.loadSlide(r),
              h.preload(),
              c.pos !== r.pos &&
                ((d =
                  'fancybox-slide--' + (c.pos > r.pos ? 'next' : 'previous')),
                c.$slide.removeClass(
                  'fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous'
                ),
                (c.isComplete = !1),
                e &&
                  (r.isMoved || r.opts.transitionEffect) &&
                  (r.isMoved
                    ? c.$slide.addClass(d)
                    : ((d =
                        'fancybox-animated ' +
                        d +
                        ' fancybox-fx-' +
                        r.opts.transitionEffect),
                      n.fancybox.animate(c.$slide, d, e, function() {
                        c.$slide.removeClass(d).removeAttr('style');
                      }))));
          }
        }
      },
      createSlide: function(t) {
        var e,
          o,
          i = this;
        return (
          (o = t % i.group.length),
          (o = o < 0 ? i.group.length + o : o),
          !i.slides[t] &&
            i.group[o] &&
            ((e = n('<div class="fancybox-slide"></div>').appendTo(
              i.$refs.stage
            )),
            (i.slides[t] = n.extend(!0, {}, i.group[o], {
              pos: t,
              $slide: e,
              isLoaded: !1
            })),
            i.updateSlide(i.slides[t])),
          i.slides[t]
        );
      },
      scaleToActual: function(t, e, i) {
        var a,
          s,
          r,
          c,
          l,
          u = this,
          d = u.current,
          f = d.$content,
          h = parseInt(d.$slide.width(), 10),
          p = parseInt(d.$slide.height(), 10),
          g = d.width,
          b = d.height;
        'image' != d.type ||
          d.hasError ||
          !f ||
          u.isAnimating ||
          (n.fancybox.stop(f),
          (u.isAnimating = !0),
          (t = t === o ? 0.5 * h : t),
          (e = e === o ? 0.5 * p : e),
          (a = n.fancybox.getTranslate(f)),
          (c = g / a.width),
          (l = b / a.height),
          (s = 0.5 * h - 0.5 * g),
          (r = 0.5 * p - 0.5 * b),
          g > h &&
            ((s = a.left * c - (t * c - t)),
            s > 0 && (s = 0),
            s < h - g && (s = h - g)),
          b > p &&
            ((r = a.top * l - (e * l - e)),
            r > 0 && (r = 0),
            r < p - b && (r = p - b)),
          u.updateCursor(g, b),
          n.fancybox.animate(
            f,
            { top: r, left: s, scaleX: c, scaleY: l },
            i || 330,
            function() {
              u.isAnimating = !1;
            }
          ),
          u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop());
      },
      scaleToFit: function(t) {
        var e,
          o = this,
          i = o.current,
          a = i.$content;
        'image' != i.type ||
          i.hasError ||
          !a ||
          o.isAnimating ||
          (n.fancybox.stop(a),
          (o.isAnimating = !0),
          (e = o.getFitPos(i)),
          o.updateCursor(e.width, e.height),
          n.fancybox.animate(
            a,
            {
              top: e.top,
              left: e.left,
              scaleX: e.width / a.width(),
              scaleY: e.height / a.height()
            },
            t || 330,
            function() {
              o.isAnimating = !1;
            }
          ));
      },
      getFitPos: function(t) {
        var e,
          o,
          i,
          a,
          r,
          c = this,
          l = t.$content,
          u = t.width,
          d = t.height,
          f = t.opts.margin;
        return (
          !(!l || !l.length || (!u && !d)) &&
          ('number' === n.type(f) && (f = [f, f]),
          2 == f.length && (f = [f[0], f[1], f[0], f[1]]),
          s.width() < 800 && (f = [0, 0, 0, 0]),
          (e = parseInt(c.$refs.stage.width(), 10) - (f[1] + f[3])),
          (o = parseInt(c.$refs.stage.height(), 10) - (f[0] + f[2])),
          (i = Math.min(1, e / u, o / d)),
          (a = Math.floor(i * u)),
          (r = Math.floor(i * d)),
          {
            top: Math.floor(0.5 * (o - r)) + f[0],
            left: Math.floor(0.5 * (e - a)) + f[3],
            width: a,
            height: r
          })
        );
      },
      update: function() {
        var t = this;
        n.each(t.slides, function(e, n) {
          t.updateSlide(n);
        });
      },
      updateSlide: function(t) {
        var e = this,
          o = t.$content;
        o &&
          (t.width || t.height) &&
          (n.fancybox.stop(o),
          n.fancybox.setTranslate(o, e.getFitPos(t)),
          t.pos === e.currPos && e.updateCursor()),
          t.$slide.trigger('refresh'),
          e.trigger('onUpdate', t);
      },
      updateCursor: function(t, e) {
        var n,
          i = this,
          a = i.$refs.container.removeClass(
            'fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut'
          );
        i.current &&
          !i.isClosing &&
          (i.isZoomable()
            ? (a.addClass('fancybox-is-zoomable'),
              (n =
                t !== o && e !== o
                  ? t < i.current.width && e < i.current.height
                  : i.isScaledDown()),
              n
                ? a.addClass('fancybox-can-zoomIn')
                : i.current.opts.touch
                ? a.addClass('fancybox-can-drag')
                : a.addClass('fancybox-can-zoomOut'))
            : i.current.opts.touch && a.addClass('fancybox-can-drag'));
      },
      isZoomable: function() {
        var t,
          e = this,
          o = e.current;
        if (o && !e.isClosing)
          return !!(
            'image' === o.type &&
            o.isLoaded &&
            !o.hasError &&
            ('zoom' === o.opts.clickContent ||
              (n.isFunction(o.opts.clickContent) &&
                'zoom' === o.opts.clickContent(o))) &&
            ((t = e.getFitPos(o)), o.width > t.width || o.height > t.height)
          );
      },
      isScaledDown: function() {
        var t = this,
          e = t.current,
          o = e.$content,
          i = !1;
        return (
          o &&
            ((i = n.fancybox.getTranslate(o)),
            (i = i.width < e.width || i.height < e.height)),
          i
        );
      },
      canPan: function() {
        var t = this,
          e = t.current,
          n = e.$content,
          o = !1;
        return (
          n &&
            ((o = t.getFitPos(e)),
            (o =
              Math.abs(n.width() - o.width) > 1 ||
              Math.abs(n.height() - o.height) > 1)),
          o
        );
      },
      loadSlide: function(t) {
        var e,
          o,
          i,
          a = this;
        if (!t.isLoading && !t.isLoaded) {
          switch (
            ((t.isLoading = !0),
            a.trigger('beforeLoad', t),
            (e = t.type),
            (o = t.$slide),
            o
              .off('refresh')
              .trigger('onReset')
              .addClass('fancybox-slide--' + (e || 'unknown'))
              .addClass(t.opts.slideClass),
            e)
          ) {
            case 'image':
              a.setImage(t);
              break;
            case 'iframe':
              a.setIframe(t);
              break;
            case 'html':
              a.setContent(t, t.src || t.content);
              break;
            case 'inline':
              n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
              break;
            case 'ajax':
              a.showLoading(t),
                (i = n.ajax(
                  n.extend({}, t.opts.ajax.settings, {
                    url: t.src,
                    success: function(e, n) {
                      'success' === n && a.setContent(t, e);
                    },
                    error: function(e, n) {
                      e && 'abort' !== n && a.setError(t);
                    }
                  })
                )),
                o.one('onReset', function() {
                  i.abort();
                });
              break;
            default:
              a.setError(t);
          }
          return !0;
        }
      },
      setImage: function(e) {
        var o,
          i,
          a,
          s,
          r = this,
          c = e.opts.image.srcset;
        if (c) {
          (a = t.devicePixelRatio || 1),
            (s = t.innerWidth * a),
            (i = c.split(',').map(function(t) {
              var e = {};
              return (
                t
                  .trim()
                  .split(/\s+/)
                  .forEach(function(t, n) {
                    var o = parseInt(t.substring(0, t.length - 1), 10);
                    return 0 === n
                      ? (e.url = t)
                      : void (
                          o && ((e.value = o), (e.postfix = t[t.length - 1]))
                        );
                  }),
                e
              );
            })),
            i.sort(function(t, e) {
              return t.value - e.value;
            });
          for (var l = 0; l < i.length; l++) {
            var u = i[l];
            if (
              ('w' === u.postfix && u.value >= s) ||
              ('x' === u.postfix && u.value >= a)
            ) {
              o = u;
              break;
            }
          }
          !o && i.length && (o = i[i.length - 1]),
            o &&
              ((e.src = o.url),
              e.width &&
                e.height &&
                'w' == o.postfix &&
                ((e.height = (e.width / e.height) * o.value),
                (e.width = o.value)));
        }
        (e.$content = n('<div class="fancybox-image-wrap"></div>')
          .addClass('fancybox-is-hidden')
          .appendTo(e.$slide)),
          e.opts.preload !== !1 &&
          e.opts.width &&
          e.opts.height &&
          (e.opts.thumb || e.opts.$thumb)
            ? ((e.width = e.opts.width),
              (e.height = e.opts.height),
              (e.$ghost = n('<img />')
                .one('error', function() {
                  n(this).remove(), (e.$ghost = null), r.setBigImage(e);
                })
                .one('load', function() {
                  r.afterLoad(e), r.setBigImage(e);
                })
                .addClass('fancybox-image')
                .appendTo(e.$content)
                .attr('src', e.opts.thumb || e.opts.$thumb.attr('src'))))
            : r.setBigImage(e);
      },
      setBigImage: function(t) {
        var e = this,
          o = n('<img />');
        (t.$image = o
          .one('error', function() {
            e.setError(t);
          })
          .one('load', function() {
            clearTimeout(t.timouts),
              (t.timouts = null),
              e.isClosing ||
                ((t.width = this.naturalWidth),
                (t.height = this.naturalHeight),
                t.opts.image.srcset &&
                  o.attr('sizes', '100vw').attr('srcset', t.opts.image.srcset),
                e.hideLoading(t),
                t.$ghost
                  ? (t.timouts = setTimeout(function() {
                      (t.timouts = null), t.$ghost.hide();
                    }, Math.min(300, Math.max(1e3, t.height / 1600))))
                  : e.afterLoad(t));
          })
          .addClass('fancybox-image')
          .attr('src', t.src)
          .appendTo(t.$content)),
          (o[0].complete || 'complete' == o[0].readyState) &&
          o[0].naturalWidth &&
          o[0].naturalHeight
            ? o.trigger('load')
            : o[0].error
            ? o.trigger('error')
            : (t.timouts = setTimeout(function() {
                o[0].complete || t.hasError || e.showLoading(t);
              }, 100));
      },
      setIframe: function(t) {
        var e,
          i = this,
          a = t.opts.iframe,
          s = t.$slide;
        (t.$content = n(
          '<div class="fancybox-content' +
            (a.preload ? ' fancybox-is-hidden' : '') +
            '"></div>'
        )
          .css(a.css)
          .appendTo(s)),
          (e = n(a.tpl.replace(/\{rnd\}/g, new Date().getTime()))
            .attr(a.attr)
            .appendTo(t.$content)),
          a.preload
            ? (i.showLoading(t),
              e.on('load.fb error.fb', function(e) {
                (this.isReady = 1), t.$slide.trigger('refresh'), i.afterLoad(t);
              }),
              s.on('refresh.fb', function() {
                var n,
                  i,
                  s,
                  r = t.$content,
                  c = a.css.width,
                  l = a.css.height;
                if (1 === e[0].isReady) {
                  try {
                    (i = e.contents()), (s = i.find('body'));
                  } catch (t) {}
                  s &&
                    s.length &&
                    (c === o &&
                      ((n =
                        e[0].contentWindow.document.documentElement
                          .scrollWidth),
                      (c = Math.ceil(s.outerWidth(!0) + (r.width() - n))),
                      (c += r.outerWidth() - r.innerWidth())),
                    l === o &&
                      ((l = Math.ceil(s.outerHeight(!0))),
                      (l += r.outerHeight() - r.innerHeight())),
                    c && r.width(c),
                    l && r.height(l)),
                    r.removeClass('fancybox-is-hidden');
                }
              }))
            : this.afterLoad(t),
          e.attr('src', t.src),
          t.opts.smallBtn === !0 &&
            t.$content.prepend(i.translate(t, t.opts.btnTpl.smallBtn)),
          s.one('onReset', function() {
            try {
              n(this)
                .find('iframe')
                .hide()
                .attr('src', '//about:blank');
            } catch (t) {}
            n(this).empty(), (t.isLoaded = !1);
          });
      },
      setContent: function(t, e) {
        var o = this;
        o.isClosing ||
          (o.hideLoading(t),
          t.$slide.empty(),
          l(e) && e.parent().length
            ? (e.parent('.fancybox-slide--inline').trigger('onReset'),
              (t.$placeholder = n('<div></div>')
                .hide()
                .insertAfter(e)),
              e.css('display', 'inline-block'))
            : t.hasError ||
              ('string' === n.type(e) &&
                ((e = n('<div>')
                  .append(n.trim(e))
                  .contents()),
                3 === e[0].nodeType && (e = n('<div>').html(e))),
              t.opts.filter &&
                (e = n('<div>')
                  .html(e)
                  .find(t.opts.filter))),
          t.$slide.one('onReset', function() {
            t.$placeholder &&
              (t.$placeholder.after(e.hide()).remove(),
              (t.$placeholder = null)),
              t.$smallBtn && (t.$smallBtn.remove(), (t.$smallBtn = null)),
              t.hasError || (n(this).empty(), (t.isLoaded = !1));
          }),
          (t.$content = n(e).appendTo(t.$slide)),
          t.opts.smallBtn &&
            !t.$smallBtn &&
            (t.$smallBtn = n(o.translate(t, t.opts.btnTpl.smallBtn)).appendTo(
              t.$content.filter('div').first()
            )),
          this.afterLoad(t));
      },
      setError: function(t) {
        (t.hasError = !0),
          t.$slide.removeClass('fancybox-slide--' + t.type),
          this.setContent(t, this.translate(t, t.opts.errorTpl));
      },
      showLoading: function(t) {
        var e = this;
        (t = t || e.current),
          t &&
            !t.$spinner &&
            (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide));
      },
      hideLoading: function(t) {
        var e = this;
        (t = t || e.current),
          t && t.$spinner && (t.$spinner.remove(), delete t.$spinner);
      },
      afterLoad: function(t) {
        var e = this;
        e.isClosing ||
          ((t.isLoading = !1),
          (t.isLoaded = !0),
          e.trigger('afterLoad', t),
          e.hideLoading(t),
          t.opts.protect &&
            t.$content &&
            !t.hasError &&
            (t.$content.on('contextmenu.fb', function(t) {
              return 2 == t.button && t.preventDefault(), !0;
            }),
            'image' === t.type &&
              n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
          e.revealContent(t));
      },
      revealContent: function(t) {
        var e,
          i,
          a,
          s,
          r,
          c = this,
          l = t.$slide,
          u = !1;
        return (
          (e = t.opts[c.firstRun ? 'animationEffect' : 'transitionEffect']),
          (a = t.opts[c.firstRun ? 'animationDuration' : 'transitionDuration']),
          (a = parseInt(t.forcedDuration === o ? a : t.forcedDuration, 10)),
          (!t.isMoved && t.pos === c.currPos && a) || (e = !1),
          'zoom' !== e ||
            (t.pos === c.currPos &&
              a &&
              'image' === t.type &&
              !t.hasError &&
              (u = c.getThumbPos(t))) ||
            (e = 'fade'),
          'zoom' === e
            ? ((r = c.getFitPos(t)),
              (r.scaleX = r.width / u.width),
              (r.scaleY = r.height / u.height),
              delete r.width,
              delete r.height,
              (s = t.opts.zoomOpacity),
              'auto' == s &&
                (s = Math.abs(t.width / t.height - u.width / u.height) > 0.1),
              s && ((u.opacity = 0.1), (r.opacity = 1)),
              n.fancybox.setTranslate(
                t.$content.removeClass('fancybox-is-hidden'),
                u
              ),
              f(t.$content),
              void n.fancybox.animate(t.$content, r, a, function() {
                c.complete();
              }))
            : (c.updateSlide(t),
              e
                ? (n.fancybox.stop(l),
                  (i =
                    'fancybox-animated fancybox-slide--' +
                    (t.pos > c.prevPos ? 'next' : 'previous') +
                    ' fancybox-fx-' +
                    e),
                  l
                    .removeAttr('style')
                    .removeClass(
                      'fancybox-slide--current fancybox-slide--next fancybox-slide--previous'
                    )
                    .addClass(i),
                  t.$content.removeClass('fancybox-is-hidden'),
                  f(l),
                  void n.fancybox.animate(
                    l,
                    'fancybox-slide--current',
                    a,
                    function(e) {
                      l.removeClass(i).removeAttr('style'),
                        t.pos === c.currPos && c.complete();
                    },
                    !0
                  ))
                : (f(l),
                  t.$content.removeClass('fancybox-is-hidden'),
                  void (t.pos === c.currPos && c.complete())))
        );
      },
      getThumbPos: function(o) {
        var i,
          a = this,
          s = !1,
          r = function(e) {
            for (
              var o, i = e[0], a = i.getBoundingClientRect(), s = [];
              null !== i.parentElement;

            )
              ('hidden' !== n(i.parentElement).css('overflow') &&
                'auto' !== n(i.parentElement).css('overflow')) ||
                s.push(i.parentElement.getBoundingClientRect()),
                (i = i.parentElement);
            return (
              (o = s.every(function(t) {
                var e = Math.min(a.right, t.right) - Math.max(a.left, t.left),
                  n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top);
                return e > 0 && n > 0;
              })),
              o &&
                a.bottom > 0 &&
                a.right > 0 &&
                a.left < n(t).width() &&
                a.top < n(t).height()
            );
          },
          c = o.opts.$thumb,
          l = c ? c.offset() : 0;
        return (
          l &&
            c[0].ownerDocument === e &&
            r(c) &&
            ((i = a.$refs.stage.offset()),
            (s = {
              top: l.top - i.top + parseFloat(c.css('border-top-width') || 0),
              left:
                l.left - i.left + parseFloat(c.css('border-left-width') || 0),
              width: c.width(),
              height: c.height(),
              scaleX: 1,
              scaleY: 1
            })),
          s
        );
      },
      complete: function() {
        var t = this,
          o = t.current,
          i = {};
        o.isMoved ||
          !o.isLoaded ||
          o.isComplete ||
          ((o.isComplete = !0),
          o.$slide.siblings().trigger('onReset'),
          f(o.$slide),
          o.$slide.addClass('fancybox-slide--complete'),
          n.each(t.slides, function(e, o) {
            o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1
              ? (i[o.pos] = o)
              : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove());
          }),
          (t.slides = i),
          t.updateCursor(),
          t.trigger('afterShow'),
          (n(e.activeElement).is('[disabled]') ||
            (o.opts.autoFocus && 'image' != o.type && 'iframe' !== o.type)) &&
            t.focus());
      },
      preload: function() {
        var t,
          e,
          n = this;
        n.group.length < 2 ||
          ((t = n.slides[n.currPos + 1]),
          (e = n.slides[n.currPos - 1]),
          t && 'image' === t.type && n.loadSlide(t),
          e && 'image' === e.type && n.loadSlide(e));
      },
      focus: function() {
        var t,
          e = this.current;
        this.isClosing ||
          (e &&
            e.isComplete &&
            ((t = e.$slide.find('input[autofocus]:enabled:visible:first')),
            t.length ||
              (t = e.$slide
                .find('button,:input,[tabindex],a')
                .filter(':enabled:visible:first'))),
          (t = t && t.length ? t : this.$refs.container),
          t.focus());
      },
      activate: function() {
        var t = this;
        n('.fancybox-container').each(function() {
          var e = n(this).data('FancyBox');
          e && e.uid !== t.uid && !e.isClosing && e.trigger('onDeactivate');
        }),
          t.current &&
            (t.$refs.container.index() > 0 &&
              t.$refs.container.prependTo(e.body),
            t.updateControls()),
          t.trigger('onActivate'),
          t.addEvents();
      },
      close: function(t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l = this,
          f = l.current,
          h = function() {
            l.cleanUp(t);
          };
        return (
          !l.isClosing &&
          ((l.isClosing = !0),
          l.trigger('beforeClose', t) === !1
            ? ((l.isClosing = !1),
              u(function() {
                l.update();
              }),
              !1)
            : (l.removeEvents(),
              f.timouts && clearTimeout(f.timouts),
              (a = f.$content),
              (o = f.opts.animationEffect),
              (i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0),
              f.$slide
                .off(d)
                .removeClass(
                  'fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated'
                ),
              f.$slide
                .siblings()
                .trigger('onReset')
                .remove(),
              i &&
                l.$refs.container
                  .removeClass('fancybox-is-open')
                  .addClass('fancybox-is-closing'),
              l.hideLoading(f),
              l.hideControls(),
              l.updateCursor(),
              'zoom' !== o ||
                (t !== !0 &&
                  a &&
                  i &&
                  'image' === f.type &&
                  !f.hasError &&
                  (c = l.getThumbPos(f))) ||
                (o = 'fade'),
              'zoom' === o
                ? (n.fancybox.stop(a),
                  (r = n.fancybox.getTranslate(a)),
                  (r.width = r.width * r.scaleX),
                  (r.height = r.height * r.scaleY),
                  (s = f.opts.zoomOpacity),
                  'auto' == s &&
                    (s =
                      Math.abs(f.width / f.height - c.width / c.height) > 0.1),
                  s && (c.opacity = 0),
                  (r.scaleX = r.width / c.width),
                  (r.scaleY = r.height / c.height),
                  (r.width = c.width),
                  (r.height = c.height),
                  n.fancybox.setTranslate(f.$content, r),
                  n.fancybox.animate(f.$content, c, i, h),
                  !0)
                : (o && i
                    ? t === !0
                      ? setTimeout(h, i)
                      : n.fancybox.animate(
                          f.$slide.removeClass('fancybox-slide--current'),
                          'fancybox-animated fancybox-slide--previous fancybox-fx-' +
                            o,
                          i,
                          h
                        )
                    : h(),
                  !0)))
        );
      },
      cleanUp: function(t) {
        var e,
          o = this;
        o.current.$slide.trigger('onReset'),
          o.$refs.container.empty().remove(),
          o.trigger('afterClose', t),
          o.$lastFocus && o.current.opts.backFocus && o.$lastFocus.focus(),
          (o.current = null),
          (e = n.fancybox.getInstance()),
          e
            ? e.activate()
            : (s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft),
              n('html').removeClass('fancybox-enabled'),
              n('#fancybox-style-noscroll').remove());
      },
      trigger: function(t, e) {
        var o,
          i = Array.prototype.slice.call(arguments, 1),
          a = this,
          s = e && e.opts ? e : a.current;
        return (
          s ? i.unshift(s) : (s = a),
          i.unshift(a),
          n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
          o === !1
            ? o
            : void ('afterClose' === t
                ? r.trigger(t + '.fb', i)
                : a.$refs.container.trigger(t + '.fb', i))
        );
      },
      updateControls: function(t) {
        var e = this,
          o = e.current,
          i = o.index,
          a = o.opts,
          s = a.caption,
          r = e.$refs.caption;
        o.$slide.trigger('refresh'),
          (e.$caption = s && s.length ? r.html(s) : null),
          e.isHiddenControls || e.showControls(),
          n('[data-fancybox-count]').html(e.group.length),
          n('[data-fancybox-index]').html(i + 1),
          n('[data-fancybox-prev]').prop('disabled', !a.loop && i <= 0),
          n('[data-fancybox-next]').prop(
            'disabled',
            !a.loop && i >= e.group.length - 1
          );
      },
      hideControls: function() {
        (this.isHiddenControls = !0),
          this.$refs.container.removeClass(
            'fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav'
          );
      },
      showControls: function() {
        var t = this,
          e = t.current ? t.current.opts : t.opts,
          n = t.$refs.container;
        (t.isHiddenControls = !1),
          (t.idleSecondsCounter = 0),
          n
            .toggleClass('fancybox-show-toolbar', !(!e.toolbar || !e.buttons))
            .toggleClass(
              'fancybox-show-infobar',
              !!(e.infobar && t.group.length > 1)
            )
            .toggleClass(
              'fancybox-show-nav',
              !!(e.arrows && t.group.length > 1)
            )
            .toggleClass('fancybox-is-modal', !!e.modal),
          t.$caption
            ? n.addClass('fancybox-show-caption ')
            : n.removeClass('fancybox-show-caption');
      },
      toggleControls: function() {
        this.isHiddenControls ? this.showControls() : this.hideControls();
      }
    }),
      (n.fancybox = {
        version: '3.1.28',
        defaults: a,
        getInstance: function(t) {
          var e = n(
              '.fancybox-container:not(".fancybox-is-closing"):first'
            ).data('FancyBox'),
            o = Array.prototype.slice.call(arguments, 1);
          return (
            e instanceof h &&
            ('string' === n.type(t)
              ? e[t].apply(e, o)
              : 'function' === n.type(t) && t.apply(e, o),
            e)
          );
        },
        open: function(t, e, n) {
          return new h(t, e, n);
        },
        close: function(t) {
          var e = this.getInstance();
          e && (e.close(), t === !0 && this.close());
        },
        destroy: function() {
          this.close(!0), r.off('click.fb-start');
        },
        isMobile:
          e.createTouch !== o &&
          /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
            navigator.userAgent
          ),
        use3d: (function() {
          var n = e.createElement('div');
          return (
            t.getComputedStyle &&
            t.getComputedStyle(n).getPropertyValue('transform') &&
            !(e.documentMode && e.documentMode < 11)
          );
        })(),
        getTranslate: function(t) {
          var e;
          if (!t || !t.length) return !1;
          if (
            ((e = t.eq(0).css('transform')),
            e && e.indexOf('matrix') !== -1
              ? ((e = e.split('(')[1]),
                (e = e.split(')')[0]),
                (e = e.split(',')))
              : (e = []),
            e.length)
          )
            (e =
              e.length > 10
                ? [e[13], e[12], e[0], e[5]]
                : [e[5], e[4], e[0], e[3]]),
              (e = e.map(parseFloat));
          else {
            e = [0, 0, 1, 1];
            var n = /\.*translate\((.*)px,(.*)px\)/i,
              o = n.exec(t.eq(0).attr('style'));
            o && ((e[0] = parseFloat(o[2])), (e[1] = parseFloat(o[1])));
          }
          return {
            top: e[0],
            left: e[1],
            scaleX: e[2],
            scaleY: e[3],
            opacity: parseFloat(t.css('opacity')),
            width: t.width(),
            height: t.height()
          };
        },
        setTranslate: function(t, e) {
          var n = '',
            i = {};
          if (t && e)
            return (
              (e.left === o && e.top === o) ||
                ((n =
                  (e.left === o ? t.position().left : e.left) +
                  'px, ' +
                  (e.top === o ? t.position().top : e.top) +
                  'px'),
                (n = this.use3d
                  ? 'translate3d(' + n + ', 0px)'
                  : 'translate(' + n + ')')),
              e.scaleX !== o &&
                e.scaleY !== o &&
                (n =
                  (n.length ? n + ' ' : '') +
                  'scale(' +
                  e.scaleX +
                  ', ' +
                  e.scaleY +
                  ')'),
              n.length && (i.transform = n),
              e.opacity !== o && (i.opacity = e.opacity),
              e.width !== o && (i.width = e.width),
              e.height !== o && (i.height = e.height),
              t.css(i)
            );
        },
        animate: function(t, e, i, a, s) {
          var r = d || 'transitionend';
          n.isFunction(i) && ((a = i), (i = null)),
            n.isPlainObject(e) || t.removeAttr('style'),
            t.on(r, function(i) {
              (!i ||
                !i.originalEvent ||
                (t.is(i.originalEvent.target) &&
                  'z-index' != i.originalEvent.propertyName)) &&
                (t.off(r),
                n.isPlainObject(e)
                  ? e.scaleX !== o &&
                    e.scaleY !== o &&
                    (t.css('transition-duration', '0ms'),
                    (e.width = Math.round(t.width() * e.scaleX)),
                    (e.height = Math.round(t.height() * e.scaleY)),
                    (e.scaleX = 1),
                    (e.scaleY = 1),
                    n.fancybox.setTranslate(t, e))
                  : s !== !0 && t.removeClass(e),
                n.isFunction(a) && a(i));
            }),
            n.isNumeric(i) && t.css('transition-duration', i + 'ms'),
            n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e),
            t.data(
              'timer',
              setTimeout(function() {
                t.trigger('transitionend');
              }, i + 16)
            );
        },
        stop: function(t) {
          clearTimeout(t.data('timer')), t.off(d);
        }
      }),
      (n.fn.fancybox = function(t) {
        var e;
        return (
          (t = t || {}),
          (e = t.selector || !1),
          e
            ? n('body')
                .off('click.fb-start', e)
                .on('click.fb-start', e, { options: t }, i)
            : this.off('click.fb-start').on(
                'click.fb-start',
                { items: this, options: t },
                i
              ),
          this
        );
      }),
      r.on('click.fb-start', '[data-fancybox]', i);
  }
})(window, document, window.jQuery || jQuery),
  (function(t) {
    'use strict';
    var e = function(e, n, o) {
        if (e)
          return (
            (o = o || ''),
            'object' === t.type(o) && (o = t.param(o, !0)),
            t.each(n, function(t, n) {
              e = e.replace('$' + t, n || '');
            }),
            o.length && (e += (e.indexOf('?') > 0 ? '&' : '?') + o),
            e
          );
      },
      n = {
        youtube: {
          matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: 'transparent',
            enablejsapi: 1,
            html5: 1
          },
          paramPlace: 8,
          type: 'iframe',
          url: '//www.youtube.com/embed/$4',
          thumb: '//img.youtube.com/vi/$4/hqdefault.jpg'
        },
        vimeo: {
          matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1,
            api: 1
          },
          paramPlace: 3,
          type: 'iframe',
          url: '//player.vimeo.com/video/$2'
        },
        metacafe: {
          matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
          type: 'iframe',
          url: '//www.metacafe.com/embed/$1/?ap=1'
        },
        dailymotion: {
          matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
          params: { additionalInfos: 0, autoStart: 1 },
          type: 'iframe',
          url: '//www.dailymotion.com/embed/video/$1'
        },
        vine: {
          matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
          type: 'iframe',
          url: '//vine.co/v/$1/embed/simple'
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: 'image',
          url: '//$1/p/$2/media/?size=l'
        },
        gmap_place: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
          type: 'iframe',
          url: function(t) {
            return (
              '//maps.google.' +
              t[2] +
              '/?ll=' +
              (t[9]
                ? t[9] +
                  '&z=' +
                  Math.floor(t[10]) +
                  (t[12] ? t[12].replace(/^\//, '&') : '')
                : t[12]) +
              '&output=' +
              (t[12] && t[12].indexOf('layer=c') > 0 ? 'svembed' : 'embed')
            );
          }
        },
        gmap_search: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
          type: 'iframe',
          url: function(t) {
            return (
              '//maps.google.' +
              t[2] +
              '/maps?q=' +
              t[5].replace('query=', 'q=').replace('api=1', '') +
              '&output=embed'
            );
          }
        }
      };
    t(document).on('onInit.fb', function(o, i) {
      t.each(i.group, function(o, i) {
        var a,
          s,
          r,
          c,
          l,
          u,
          d,
          f = i.src || '',
          h = !1;
        i.type ||
          ((a = t.extend(!0, {}, n, i.opts.media)),
          t.each(a, function(n, o) {
            if (((r = f.match(o.matcher)), (u = {}), (d = n), r)) {
              if (((h = o.type), o.paramPlace && r[o.paramPlace])) {
                (l = r[o.paramPlace]),
                  '?' == l[0] && (l = l.substring(1)),
                  (l = l.split('&'));
                for (var a = 0; a < l.length; ++a) {
                  var p = l[a].split('=', 2);
                  2 == p.length &&
                    (u[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' ')));
                }
              }
              return (
                (c = t.extend(!0, {}, o.params, i.opts[n], u)),
                (f =
                  'function' === t.type(o.url)
                    ? o.url.call(this, r, c, i)
                    : e(o.url, r, c)),
                (s =
                  'function' === t.type(o.thumb)
                    ? o.thumb.call(this, r, c, i)
                    : e(o.thumb, r)),
                'vimeo' === d && (f = f.replace('&%23', '#')),
                !1
              );
            }
          }),
          h
            ? ((i.src = f),
              (i.type = h),
              i.opts.thumb ||
                (i.opts.$thumb && i.opts.$thumb.length) ||
                (i.opts.thumb = s),
              'iframe' === h &&
                (t.extend(!0, i.opts, {
                  iframe: { preload: !1, attr: { scrolling: 'no' } }
                }),
                (i.contentProvider = d),
                (i.opts.slideClass +=
                  ' fancybox-slide--' +
                  ('gmap_place' == d || 'gmap_search' == d ? 'map' : 'video'))))
            : (i.type = 'image'));
      });
    });
  })(window.jQuery),
  (function(t, e, n) {
    'use strict';
    var o = (function() {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function(e) {
            return t.setTimeout(e, 1e3 / 60);
          }
        );
      })(),
      i = (function() {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function(e) {
            t.clearTimeout(e);
          }
        );
      })(),
      a = function(e) {
        var n = [];
        (e = e.originalEvent || e || t.e),
          (e =
            e.touches && e.touches.length
              ? e.touches
              : e.changedTouches && e.changedTouches.length
              ? e.changedTouches
              : [e]);
        for (var o in e)
          e[o].pageX
            ? n.push({ x: e[o].pageX, y: e[o].pageY })
            : e[o].clientX && n.push({ x: e[o].clientX, y: e[o].clientY });
        return n;
      },
      s = function(t, e, n) {
        return e && t
          ? 'x' === n
            ? t.x - e.x
            : 'y' === n
            ? t.y - e.y
            : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
          : 0;
      },
      r = function(t) {
        if (
          t.is('a,button,input,select,textarea,label') ||
          n.isFunction(t.get(0).onclick) ||
          t.data('selectable')
        )
          return !0;
        for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
          if ('data-fancybox-' === o[e].nodeName.substr(0, 14)) return !0;
        return !1;
      },
      c = function(e) {
        var n = t.getComputedStyle(e)['overflow-y'],
          o = t.getComputedStyle(e)['overflow-x'],
          i =
            ('scroll' === n || 'auto' === n) && e.scrollHeight > e.clientHeight,
          a = ('scroll' === o || 'auto' === o) && e.scrollWidth > e.clientWidth;
        return i || a;
      },
      l = function(t) {
        for (var e = !1; ; ) {
          if ((e = c(t.get(0)))) break;
          if (
            ((t = t.parent()),
            !t.length || t.hasClass('fancybox-stage') || t.is('body'))
          )
            break;
        }
        return e;
      },
      u = function(t) {
        var e = this;
        (e.instance = t),
          (e.$bg = t.$refs.bg),
          (e.$stage = t.$refs.stage),
          (e.$container = t.$refs.container),
          e.destroy(),
          e.$container.on(
            'touchstart.fb.touch mousedown.fb.touch',
            n.proxy(e, 'ontouchstart')
          );
      };
    (u.prototype.destroy = function() {
      this.$container.off('.fb.touch');
    }),
      (u.prototype.ontouchstart = function(o) {
        var i = this,
          c = n(o.target),
          u = i.instance,
          d = u.current,
          f = d.$content,
          h = 'touchstart' == o.type;
        if (
          (h && i.$container.off('mousedown.fb.touch'),
          !d || i.instance.isAnimating || i.instance.isClosing)
        )
          return o.stopPropagation(), void o.preventDefault();
        if (
          (!o.originalEvent || 2 != o.originalEvent.button) &&
          c.length &&
          !r(c) &&
          !r(c.parent()) &&
          !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left) &&
          ((i.startPoints = a(o)),
          i.startPoints && !(i.startPoints.length > 1 && u.isSliding))
        ) {
          if (
            ((i.$target = c),
            (i.$content = f),
            (i.canTap = !0),
            n(e).off('.fb.touch'),
            n(e).on(
              h
                ? 'touchend.fb.touch touchcancel.fb.touch'
                : 'mouseup.fb.touch mouseleave.fb.touch',
              n.proxy(i, 'ontouchend')
            ),
            n(e).on(
              h ? 'touchmove.fb.touch' : 'mousemove.fb.touch',
              n.proxy(i, 'ontouchmove')
            ),
            (!u.current.opts.touch && !u.canPan()) ||
              (!c.is(i.$stage) && !i.$stage.find(c).length))
          )
            return void (c.is('img') && o.preventDefault());
          o.stopPropagation(),
            (n.fancybox.isMobile && (l(i.$target) || l(i.$target.parent()))) ||
              o.preventDefault(),
            (i.canvasWidth = Math.round(d.$slide[0].clientWidth)),
            (i.canvasHeight = Math.round(d.$slide[0].clientHeight)),
            (i.startTime = new Date().getTime()),
            (i.distanceX = i.distanceY = i.distance = 0),
            (i.isPanning = !1),
            (i.isSwiping = !1),
            (i.isZooming = !1),
            (i.sliderStartPos = i.sliderLastPos || { top: 0, left: 0 }),
            (i.contentStartPos = n.fancybox.getTranslate(i.$content)),
            (i.contentLastPos = null),
            1 !== i.startPoints.length ||
              i.isZooming ||
              ((i.canTap = !u.isSliding),
              'image' === d.type &&
              (i.contentStartPos.width > i.canvasWidth + 1 ||
                i.contentStartPos.height > i.canvasHeight + 1)
                ? (n.fancybox.stop(i.$content),
                  i.$content.css('transition-duration', '0ms'),
                  (i.isPanning = !0))
                : (i.isSwiping = !0),
              i.$container.addClass('fancybox-controls--isGrabbing')),
            2 !== i.startPoints.length ||
              u.isAnimating ||
              d.hasError ||
              'image' !== d.type ||
              (!d.isLoaded && !d.$ghost) ||
              ((i.isZooming = !0),
              (i.isSwiping = !1),
              (i.isPanning = !1),
              n.fancybox.stop(i.$content),
              i.$content.css('transition-duration', '0ms'),
              (i.centerPointStartX =
                0.5 * (i.startPoints[0].x + i.startPoints[1].x) -
                n(t).scrollLeft()),
              (i.centerPointStartY =
                0.5 * (i.startPoints[0].y + i.startPoints[1].y) -
                n(t).scrollTop()),
              (i.percentageOfImageAtPinchPointX =
                (i.centerPointStartX - i.contentStartPos.left) /
                i.contentStartPos.width),
              (i.percentageOfImageAtPinchPointY =
                (i.centerPointStartY - i.contentStartPos.top) /
                i.contentStartPos.height),
              (i.startDistanceBetweenFingers = s(
                i.startPoints[0],
                i.startPoints[1]
              )));
        }
      }),
      (u.prototype.ontouchmove = function(t) {
        var e = this;
        if (
          ((e.newPoints = a(t)),
          n.fancybox.isMobile && (l(e.$target) || l(e.$target.parent())))
        )
          return t.stopPropagation(), void (e.canTap = !1);
        if (
          (e.instance.current.opts.touch || e.instance.canPan()) &&
          e.newPoints &&
          e.newPoints.length &&
          ((e.distanceX = s(e.newPoints[0], e.startPoints[0], 'x')),
          (e.distanceY = s(e.newPoints[0], e.startPoints[0], 'y')),
          (e.distance = s(e.newPoints[0], e.startPoints[0])),
          e.distance > 0)
        ) {
          if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length)
            return;
          t.stopPropagation(),
            t.preventDefault(),
            e.isSwiping
              ? e.onSwipe()
              : e.isPanning
              ? e.onPan()
              : e.isZooming && e.onZoom();
        }
      }),
      (u.prototype.onSwipe = function() {
        var e,
          a = this,
          s = a.isSwiping,
          r = a.sliderStartPos.left || 0;
        s === !0
          ? Math.abs(a.distance) > 10 &&
            ((a.canTap = !1),
            a.instance.group.length < 2 && a.instance.opts.touch.vertical
              ? (a.isSwiping = 'y')
              : a.instance.isSliding ||
                a.instance.opts.touch.vertical === !1 ||
                ('auto' === a.instance.opts.touch.vertical &&
                  n(t).width() > 800)
              ? (a.isSwiping = 'x')
              : ((e = Math.abs(
                  (180 * Math.atan2(a.distanceY, a.distanceX)) / Math.PI
                )),
                (a.isSwiping = e > 45 && e < 135 ? 'y' : 'x')),
            (a.instance.isSliding = a.isSwiping),
            (a.startPoints = a.newPoints),
            n.each(a.instance.slides, function(t, e) {
              n.fancybox.stop(e.$slide),
                e.$slide.css('transition-duration', '0ms'),
                (e.inTransition = !1),
                e.pos === a.instance.current.pos &&
                  (a.sliderStartPos.left = n.fancybox.getTranslate(
                    e.$slide
                  ).left);
            }),
            a.instance.SlideShow &&
              a.instance.SlideShow.isActive &&
              a.instance.SlideShow.stop())
          : ('x' == s &&
              (a.distanceX > 0 &&
              (a.instance.group.length < 2 ||
                (0 === a.instance.current.index &&
                  !a.instance.current.opts.loop))
                ? (r += Math.pow(a.distanceX, 0.8))
                : a.distanceX < 0 &&
                  (a.instance.group.length < 2 ||
                    (a.instance.current.index === a.instance.group.length - 1 &&
                      !a.instance.current.opts.loop))
                ? (r -= Math.pow(-a.distanceX, 0.8))
                : (r += a.distanceX)),
            (a.sliderLastPos = {
              top: 'x' == s ? 0 : a.sliderStartPos.top + a.distanceY,
              left: r
            }),
            a.requestId && (i(a.requestId), (a.requestId = null)),
            (a.requestId = o(function() {
              a.sliderLastPos &&
                (n.each(a.instance.slides, function(t, e) {
                  var o = e.pos - a.instance.currPos;
                  n.fancybox.setTranslate(e.$slide, {
                    top: a.sliderLastPos.top,
                    left:
                      a.sliderLastPos.left +
                      o * a.canvasWidth +
                      o * e.opts.gutter
                  });
                }),
                a.$container.addClass('fancybox-is-sliding'));
            })));
      }),
      (u.prototype.onPan = function() {
        var t,
          e,
          a,
          s = this;
        (s.canTap = !1),
          (t =
            s.contentStartPos.width > s.canvasWidth
              ? s.contentStartPos.left + s.distanceX
              : s.contentStartPos.left),
          (e = s.contentStartPos.top + s.distanceY),
          (a = s.limitMovement(
            t,
            e,
            s.contentStartPos.width,
            s.contentStartPos.height
          )),
          (a.scaleX = s.contentStartPos.scaleX),
          (a.scaleY = s.contentStartPos.scaleY),
          (s.contentLastPos = a),
          s.requestId && (i(s.requestId), (s.requestId = null)),
          (s.requestId = o(function() {
            n.fancybox.setTranslate(s.$content, s.contentLastPos);
          }));
      }),
      (u.prototype.limitMovement = function(t, e, n, o) {
        var i,
          a,
          s,
          r,
          c = this,
          l = c.canvasWidth,
          u = c.canvasHeight,
          d = c.contentStartPos.left,
          f = c.contentStartPos.top,
          h = c.distanceX,
          p = c.distanceY;
        return (
          (i = Math.max(0, 0.5 * l - 0.5 * n)),
          (a = Math.max(0, 0.5 * u - 0.5 * o)),
          (s = Math.min(l - n, 0.5 * l - 0.5 * n)),
          (r = Math.min(u - o, 0.5 * u - 0.5 * o)),
          n > l &&
            (h > 0 && t > i && (t = i - 1 + Math.pow(-i + d + h, 0.8) || 0),
            h < 0 && t < s && (t = s + 1 - Math.pow(s - d - h, 0.8) || 0)),
          o > u &&
            (p > 0 && e > a && (e = a - 1 + Math.pow(-a + f + p, 0.8) || 0),
            p < 0 && e < r && (e = r + 1 - Math.pow(r - f - p, 0.8) || 0)),
          { top: e, left: t }
        );
      }),
      (u.prototype.limitPosition = function(t, e, n, o) {
        var i = this,
          a = i.canvasWidth,
          s = i.canvasHeight;
        return (
          n > a
            ? ((t = t > 0 ? 0 : t), (t = t < a - n ? a - n : t))
            : (t = Math.max(0, a / 2 - n / 2)),
          o > s
            ? ((e = e > 0 ? 0 : e), (e = e < s - o ? s - o : e))
            : (e = Math.max(0, s / 2 - o / 2)),
          { top: e, left: t }
        );
      }),
      (u.prototype.onZoom = function() {
        var e = this,
          a = e.contentStartPos.width,
          r = e.contentStartPos.height,
          c = e.contentStartPos.left,
          l = e.contentStartPos.top,
          u = s(e.newPoints[0], e.newPoints[1]),
          d = u / e.startDistanceBetweenFingers,
          f = Math.floor(a * d),
          h = Math.floor(r * d),
          p = (a - f) * e.percentageOfImageAtPinchPointX,
          g = (r - h) * e.percentageOfImageAtPinchPointY,
          b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
          m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
          y = b - e.centerPointStartX,
          v = m - e.centerPointStartY,
          x = c + (p + y),
          w = l + (g + v),
          $ = {
            top: w,
            left: x,
            scaleX: e.contentStartPos.scaleX * d,
            scaleY: e.contentStartPos.scaleY * d
          };
        (e.canTap = !1),
          (e.newWidth = f),
          (e.newHeight = h),
          (e.contentLastPos = $),
          e.requestId && (i(e.requestId), (e.requestId = null)),
          (e.requestId = o(function() {
            n.fancybox.setTranslate(e.$content, e.contentLastPos);
          }));
      }),
      (u.prototype.ontouchend = function(t) {
        var o = this,
          s = Math.max(new Date().getTime() - o.startTime, 1),
          r = o.isSwiping,
          c = o.isPanning,
          l = o.isZooming;
        return (
          (o.endPoints = a(t)),
          o.$container.removeClass('fancybox-controls--isGrabbing'),
          n(e).off('.fb.touch'),
          o.requestId && (i(o.requestId), (o.requestId = null)),
          (o.isSwiping = !1),
          (o.isPanning = !1),
          (o.isZooming = !1),
          o.canTap
            ? o.onTap(t)
            : ((o.speed = 366),
              (o.velocityX = (o.distanceX / s) * 0.5),
              (o.velocityY = (o.distanceY / s) * 0.5),
              (o.speedX = Math.max(
                0.5 * o.speed,
                Math.min(1.5 * o.speed, (1 / Math.abs(o.velocityX)) * o.speed)
              )),
              void (c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r)))
        );
      }),
      (u.prototype.endSwiping = function(t) {
        var e = this,
          o = !1;
        (e.instance.isSliding = !1),
          (e.sliderLastPos = null),
          'y' == t && Math.abs(e.distanceY) > 50
            ? (n.fancybox.animate(
                e.instance.current.$slide,
                {
                  top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
                  opacity: 0
                },
                150
              ),
              (o = e.instance.close(!0, 300)))
            : 'x' == t && e.distanceX > 50 && e.instance.group.length > 1
            ? (o = e.instance.previous(e.speedX))
            : 'x' == t &&
              e.distanceX < -50 &&
              e.instance.group.length > 1 &&
              (o = e.instance.next(e.speedX)),
          o !== !1 ||
            ('x' != t && 'y' != t) ||
            e.instance.jumpTo(e.instance.current.index, 150),
          e.$container.removeClass('fancybox-is-sliding');
      }),
      (u.prototype.endPanning = function() {
        var t,
          e,
          o,
          i = this;
        i.contentLastPos &&
          (i.instance.current.opts.touch.momentum === !1
            ? ((t = i.contentLastPos.left), (e = i.contentLastPos.top))
            : ((t = i.contentLastPos.left + i.velocityX * i.speed),
              (e = i.contentLastPos.top + i.velocityY * i.speed)),
          (o = i.limitPosition(
            t,
            e,
            i.contentStartPos.width,
            i.contentStartPos.height
          )),
          (o.width = i.contentStartPos.width),
          (o.height = i.contentStartPos.height),
          n.fancybox.animate(i.$content, o, 330));
      }),
      (u.prototype.endZooming = function() {
        var t,
          e,
          o,
          i,
          a = this,
          s = a.instance.current,
          r = a.newWidth,
          c = a.newHeight;
        a.contentLastPos &&
          ((t = a.contentLastPos.left),
          (e = a.contentLastPos.top),
          (i = { top: e, left: t, width: r, height: c, scaleX: 1, scaleY: 1 }),
          n.fancybox.setTranslate(a.$content, i),
          r < a.canvasWidth && c < a.canvasHeight
            ? a.instance.scaleToFit(150)
            : r > s.width || c > s.height
            ? a.instance.scaleToActual(
                a.centerPointStartX,
                a.centerPointStartY,
                150
              )
            : ((o = a.limitPosition(t, e, r, c)),
              n.fancybox.setTranslate(
                a.content,
                n.fancybox.getTranslate(a.$content)
              ),
              n.fancybox.animate(a.$content, o, 150)));
      }),
      (u.prototype.onTap = function(t) {
        var e,
          o = this,
          i = n(t.target),
          s = o.instance,
          r = s.current,
          c = (t && a(t)) || o.startPoints,
          l = c[0] ? c[0].x - o.$stage.offset().left : 0,
          u = c[0] ? c[0].y - o.$stage.offset().top : 0,
          d = function(e) {
            var i = r.opts[e];
            if ((n.isFunction(i) && (i = i.apply(s, [r, t])), i))
              switch (i) {
                case 'close':
                  s.close(o.startEvent);
                  break;
                case 'toggleControls':
                  s.toggleControls(!0);
                  break;
                case 'next':
                  s.next();
                  break;
                case 'nextOrClose':
                  s.group.length > 1 ? s.next() : s.close(o.startEvent);
                  break;
                case 'zoom':
                  'image' == r.type &&
                    (r.isLoaded || r.$ghost) &&
                    (s.canPan()
                      ? s.scaleToFit()
                      : s.isScaledDown()
                      ? s.scaleToActual(l, u)
                      : s.group.length < 2 && s.close(o.startEvent));
              }
          };
        if (
          !(
            (t.originalEvent && 2 == t.originalEvent.button) ||
            s.isSliding ||
            l > i[0].clientWidth + i.offset().left
          )
        ) {
          if (
            i.is(
              '.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container'
            )
          )
            e = 'Outside';
          else if (i.is('.fancybox-slide')) e = 'Slide';
          else {
            if (!s.current.$content || !s.current.$content.has(t.target).length)
              return;
            e = 'Content';
          }
          if (o.tapped) {
            if (
              (clearTimeout(o.tapped),
              (o.tapped = null),
              Math.abs(l - o.tapX) > 50 ||
                Math.abs(u - o.tapY) > 50 ||
                s.isSliding)
            )
              return this;
            d('dblclick' + e);
          } else
            (o.tapX = l),
              (o.tapY = u),
              r.opts['dblclick' + e] &&
              r.opts['dblclick' + e] !== r.opts['click' + e]
                ? (o.tapped = setTimeout(function() {
                    (o.tapped = null), d('click' + e);
                  }, 300))
                : d('click' + e);
          return this;
        }
      }),
      n(e).on('onActivate.fb', function(t, e) {
        e && !e.Guestures && (e.Guestures = new u(e));
      }),
      n(e).on('beforeClose.fb', function(t, e) {
        e && e.Guestures && e.Guestures.destroy();
      });
  })(window, document, window.jQuery),
  (function(t, e) {
    'use strict';
    var n = function(t) {
      (this.instance = t), this.init();
    };
    e.extend(n.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      speed: 3e3,
      init: function() {
        var t = this;
        (t.$button = t.instance.$refs.toolbar
          .find('[data-fancybox-play]')
          .on('click', function() {
            t.toggle();
          })),
          (t.instance.group.length < 2 ||
            !t.instance.group[t.instance.currIndex].opts.slideShow) &&
            t.$button.hide();
      },
      set: function() {
        var t = this;
        t.instance &&
        t.instance.current &&
        (t.instance.current.opts.loop ||
          t.instance.currIndex < t.instance.group.length - 1)
          ? (t.timer = setTimeout(function() {
              t.instance.next();
            }, t.instance.current.opts.slideShow.speed || t.speed))
          : (t.stop(),
            (t.instance.idleSecondsCounter = 0),
            t.instance.showControls());
      },
      clear: function() {
        var t = this;
        clearTimeout(t.timer), (t.timer = null);
      },
      start: function() {
        var t = this,
          e = t.instance.current;
        t.instance &&
          e &&
          (e.opts.loop || e.index < t.instance.group.length - 1) &&
          ((t.isActive = !0),
          t.$button
            .attr('title', e.opts.i18n[e.opts.lang].PLAY_STOP)
            .addClass('fancybox-button--pause'),
          e.isComplete && t.set());
      },
      stop: function() {
        var t = this,
          e = t.instance.current;
        t.clear(),
          t.$button
            .attr('title', e.opts.i18n[e.opts.lang].PLAY_START)
            .removeClass('fancybox-button--pause'),
          (t.isActive = !1);
      },
      toggle: function() {
        var t = this;
        t.isActive ? t.stop() : t.start();
      }
    }),
      e(t).on({
        'onInit.fb': function(t, e) {
          e && !e.SlideShow && (e.SlideShow = new n(e));
        },
        'beforeShow.fb': function(t, e, n, o) {
          var i = e && e.SlideShow;
          o
            ? i && n.opts.slideShow.autoStart && i.start()
            : i && i.isActive && i.clear();
        },
        'afterShow.fb': function(t, e, n) {
          var o = e && e.SlideShow;
          o && o.isActive && o.set();
        },
        'afterKeydown.fb': function(n, o, i, a, s) {
          var r = o && o.SlideShow;
          !r ||
            !i.opts.slideShow ||
            (80 !== s && 32 !== s) ||
            e(t.activeElement).is('button,a,input') ||
            (a.preventDefault(), r.toggle());
        },
        'beforeClose.fb onDeactivate.fb': function(t, e) {
          var n = e && e.SlideShow;
          n && n.stop();
        }
      }),
      e(t).on('visibilitychange', function() {
        var n = e.fancybox.getInstance(),
          o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set());
      });
  })(document, window.jQuery),
  (function(t, e) {
    'use strict';
    var n = (function() {
      var e,
        n,
        o,
        i = [
          [
            'requestFullscreen',
            'exitFullscreen',
            'fullscreenElement',
            'fullscreenEnabled',
            'fullscreenchange',
            'fullscreenerror'
          ],
          [
            'webkitRequestFullscreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitFullscreenEnabled',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
          ],
          [
            'webkitRequestFullScreen',
            'webkitCancelFullScreen',
            'webkitCurrentFullScreenElement',
            'webkitCancelFullScreen',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
          ],
          [
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozFullScreenElement',
            'mozFullScreenEnabled',
            'mozfullscreenchange',
            'mozfullscreenerror'
          ],
          [
            'msRequestFullscreen',
            'msExitFullscreen',
            'msFullscreenElement',
            'msFullscreenEnabled',
            'MSFullscreenChange',
            'MSFullscreenError'
          ]
        ],
        a = {};
      for (n = 0; n < i.length; n++)
        if (((e = i[n]), e && e[1] in t)) {
          for (o = 0; o < e.length; o++) a[i[0][o]] = e[o];
          return a;
        }
      return !1;
    })();
    if (!n)
      return void (
        e &&
        e.fancybox &&
        (e.fancybox.defaults.btnTpl.fullScreen = !1)
      );
    var o = {
      request: function(e) {
        (e = e || t.documentElement),
          e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT);
      },
      exit: function() {
        t[n.exitFullscreen]();
      },
      toggle: function(e) {
        (e = e || t.documentElement),
          this.isFullscreen() ? this.exit() : this.request(e);
      },
      isFullscreen: function() {
        return Boolean(t[n.fullscreenElement]);
      },
      enabled: function() {
        return Boolean(t[n.fullscreenEnabled]);
      }
    };
    e(t).on({
      'onInit.fb': function(t, e) {
        var n,
          i = e.$refs.toolbar.find('[data-fancybox-fullscreen]');
        e && !e.FullScreen && e.group[e.currIndex].opts.fullScreen
          ? ((n = e.$refs.container),
            n.on('click.fb-fullscreen', '[data-fancybox-fullscreen]', function(
              t
            ) {
              t.stopPropagation(), t.preventDefault(), o.toggle(n[0]);
            }),
            e.opts.fullScreen &&
              e.opts.fullScreen.autoStart === !0 &&
              o.request(n[0]),
            (e.FullScreen = o))
          : i.hide();
      },
      'afterKeydown.fb': function(t, e, n, o, i) {
        e &&
          e.FullScreen &&
          70 === i &&
          (o.preventDefault(), e.FullScreen.toggle(e.$refs.container[0]));
      },
      'beforeClose.fb': function(t) {
        t && t.FullScreen && o.exit();
      }
    }),
      e(t).on(n.fullscreenchange, function() {
        var t = e.fancybox.getInstance();
        t.current &&
          'image' === t.current.type &&
          t.isAnimating &&
          (t.current.$content.css('transition', 'none'),
          (t.isAnimating = !1),
          t.update(!0, !0, 0)),
          t.trigger('onFullscreenChange', o.isFullscreen());
      });
  })(document, window.jQuery),
  (function(t, e) {
    'use strict';
    var n = function(t) {
      (this.instance = t), this.init();
    };
    e.extend(n.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      init: function() {
        var t = this,
          e = t.instance.group[0],
          n = t.instance.group[1];
        (t.$button = t.instance.$refs.toolbar.find('[data-fancybox-thumbs]')),
          t.instance.group.length > 1 &&
          t.instance.group[t.instance.currIndex].opts.thumbs &&
          ('image' == e.type || e.opts.thumb || e.opts.$thumb) &&
          ('image' == n.type || n.opts.thumb || n.opts.$thumb)
            ? (t.$button.on('click', function() {
                t.toggle();
              }),
              (t.isActive = !0))
            : (t.$button.hide(), (t.isActive = !1));
      },
      create: function() {
        var t,
          n,
          o = this.instance;
        (this.$grid = e('<div class="fancybox-thumbs"></div>').appendTo(
          o.$refs.container
        )),
          (t = '<ul>'),
          e.each(o.group, function(e, o) {
            (n =
              o.opts.thumb ||
              (o.opts.$thumb ? o.opts.$thumb.attr('src') : null)),
              n || 'image' !== o.type || (n = o.src),
              n &&
                n.length &&
                (t +=
                  '<li data-index="' +
                  e +
                  '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' +
                  n +
                  '" /></li>');
          }),
          (t += '</ul>'),
          (this.$list = e(t)
            .appendTo(this.$grid)
            .on('click', 'li', function() {
              o.jumpTo(e(this).data('index'));
            })),
          this.$list
            .find('img')
            .hide()
            .one('load', function() {
              var t,
                n,
                o,
                i,
                a = e(this)
                  .parent()
                  .removeClass('fancybox-thumbs-loading'),
                s = a.outerWidth(),
                r = a.outerHeight();
              (t = this.naturalWidth || this.width),
                (n = this.naturalHeight || this.height),
                (o = t / s),
                (i = n / r),
                o >= 1 &&
                  i >= 1 &&
                  (o > i ? ((t /= i), (n = r)) : ((t = s), (n /= o))),
                e(this)
                  .css({
                    width: Math.floor(t),
                    height: Math.floor(n),
                    'margin-top': Math.min(0, Math.floor(0.3 * r - 0.3 * n)),
                    'margin-left': Math.min(0, Math.floor(0.5 * s - 0.5 * t))
                  })
                  .show();
            })
            .each(function() {
              this.src = e(this).data('src');
            });
      },
      focus: function() {
        this.instance.current &&
          this.$list
            .children()
            .removeClass('fancybox-thumbs-active')
            .filter('[data-index="' + this.instance.current.index + '"]')
            .addClass('fancybox-thumbs-active')
            .focus();
      },
      close: function() {
        this.$grid.hide();
      },
      update: function() {
        this.instance.$refs.container.toggleClass(
          'fancybox-show-thumbs',
          this.isVisible
        ),
          this.isVisible
            ? (this.$grid || this.create(),
              this.instance.trigger('onThumbsShow'),
              this.focus())
            : this.$grid && this.instance.trigger('onThumbsHide'),
          this.instance.update();
      },
      hide: function() {
        (this.isVisible = !1), this.update();
      },
      show: function() {
        (this.isVisible = !0), this.update();
      },
      toggle: function() {
        (this.isVisible = !this.isVisible), this.update();
      }
    }),
      e(t).on({
        'onInit.fb': function(t, e) {
          e && !e.Thumbs && (e.Thumbs = new n(e));
        },
        'beforeShow.fb': function(t, e, n, o) {
          var i = e && e.Thumbs;
          if (i && i.isActive) {
            if (n.modal) return i.$button.hide(), void i.hide();
            o && n.opts.thumbs.autoStart === !0 && i.show(),
              i.isVisible && i.focus();
          }
        },
        'afterKeydown.fb': function(t, e, n, o, i) {
          var a = e && e.Thumbs;
          a && a.isActive && 71 === i && (o.preventDefault(), a.toggle());
        },
        'beforeClose.fb': function(t, e) {
          var n = e && e.Thumbs;
          n && n.isVisible && e.opts.thumbs.hideOnClose !== !1 && n.close();
        }
      });
  })(document, window.jQuery),
  (function(t, e, n) {
    'use strict';
    function o() {
      var t = e.location.hash.substr(1),
        n = t.split('-'),
        o =
          n.length > 1 && /^\+?\d+$/.test(n[n.length - 1])
            ? parseInt(n.pop(-1), 10) || 1
            : 1,
        i = n.join('-');
      return o < 1 && (o = 1), { hash: t, index: o, gallery: i };
    }
    function i(t) {
      var e;
      '' !== t.gallery &&
        ((e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(
          t.index - 1
        )),
        e.length || (e = n('#' + n.escapeSelector(t.gallery))),
        e.length && ((s = !1), e.trigger('click')));
    }
    function a(t) {
      var e;
      return (
        !!t &&
        ((e = t.current ? t.current.opts : t.opts),
        e.hash || (e.$orig ? e.$orig.data('fancybox') : ''))
      );
    }
    n.escapeSelector ||
      (n.escapeSelector = function(t) {
        var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          n = function(t, e) {
            return e
              ? '\0' === t
                ? '�'
                : t.slice(0, -1) +
                  '\\' +
                  t.charCodeAt(t.length - 1).toString(16) +
                  ' '
              : '\\' + t;
          };
        return (t + '').replace(e, n);
      });
    var s = !0,
      r = null,
      c = null;
    n(function() {
      setTimeout(function() {
        n.fancybox.defaults.hash !== !1 &&
          (n(t).on({
            'onInit.fb': function(t, e) {
              var n, i;
              e.group[e.currIndex].opts.hash !== !1 &&
                ((n = o()),
                (i = a(e)),
                i &&
                  n.gallery &&
                  i == n.gallery &&
                  (e.currIndex = n.index - 1));
            },
            'beforeShow.fb': function(n, o, i) {
              var l;
              i &&
                i.opts.hash !== !1 &&
                ((l = a(o)),
                l &&
                  '' !== l &&
                  (e.location.hash.indexOf(l) < 0 &&
                    (o.opts.origHash = e.location.hash),
                  (r = l + (o.group.length > 1 ? '-' + (i.index + 1) : '')),
                  'replaceState' in e.history
                    ? (c && clearTimeout(c),
                      (c = setTimeout(function() {
                        e.history[s ? 'pushState' : 'replaceState'](
                          {},
                          t.title,
                          e.location.pathname + e.location.search + '#' + r
                        ),
                          (c = null),
                          (s = !1);
                      }, 300)))
                    : (e.location.hash = r)));
            },
            'beforeClose.fb': function(o, i, s) {
              var l, u;
              c && clearTimeout(c),
                s.opts.hash !== !1 &&
                  ((l = a(i)),
                  (u = i && i.opts.origHash ? i.opts.origHash : ''),
                  l &&
                    '' !== l &&
                    ('replaceState' in history
                      ? e.history.replaceState(
                          {},
                          t.title,
                          e.location.pathname + e.location.search + u
                        )
                      : ((e.location.hash = u),
                        n(e)
                          .scrollTop(i.scrollTop)
                          .scrollLeft(i.scrollLeft))),
                  (r = null));
            }
          }),
          n(e).on('hashchange.fb', function() {
            var t = o();
            n.fancybox.getInstance()
              ? !r ||
                r === t.gallery + '-' + t.index ||
                (1 === t.index && r == t.gallery) ||
                ((r = null), n.fancybox.close())
              : '' !== t.gallery && i(t);
          }),
          i(o()));
      }, 50);
    });
  })(document, window, window.jQuery);
/*! FitVids */
!(function(t) {
  'use strict';
  t.fn.fitVids = function(e) {
    var i = { customSelector: null };
    if (!document.getElementById('fit-vids-style')) {
      var r = document.createElement('div'),
        a =
          document.getElementsByTagName('base')[0] ||
          document.getElementsByTagName('script')[0],
        o =
          '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';
      (r.className = 'fit-vids-style'),
        (r.id = 'fit-vids-style'),
        (r.style.display = 'none'),
        (r.innerHTML = o),
        a.parentNode.insertBefore(r, a);
    }
    return (
      e && t.extend(i, e),
      this.each(function() {
        var e = [
          "iframe[src*='player.vimeo.com']",
          "iframe[src*='youtube.com']",
          "iframe[src*='youtube-nocookie.com']",
          "iframe[src*='kickstarter.com'][src*='video.html']",
          'object',
          'embed'
        ];
        i.customSelector && e.push(i.customSelector);
        var r = t(this).find(e.join(','));
        (r = r.not('object object')),
          r.each(function() {
            var e = t(this);
            if (
              !(
                ('embed' === this.tagName.toLowerCase() &&
                  e.parent('object').length) ||
                e.parent('.fluid-width-video-wrapper').length
              )
            ) {
              var i =
                  'object' === this.tagName.toLowerCase() ||
                  (e.attr('height') && !isNaN(parseInt(e.attr('height'), 10)))
                    ? parseInt(e.attr('height'), 10)
                    : e.height(),
                r = isNaN(parseInt(e.attr('width'), 10))
                  ? e.width()
                  : parseInt(e.attr('width'), 10),
                a = i / r;
              if (!e.attr('id')) {
                var o = 'fitvid' + Math.floor(999999 * Math.random());
                e.attr('id', o);
              }
              e
                .wrap('<div class="fluid-width-video-wrapper"></div>')
                .parent('.fluid-width-video-wrapper')
                .css('padding-top', 100 * a + '%'),
                e.removeAttr('height').removeAttr('width');
            }
          });
      })
    );
  };
})(window.jQuery || window.Zepto);
/*! Scroll Reveal Animations */
window.scrollReveal = (function(t) {
  'use strict';
  function e(e) {
    (this.docElem = t.document.documentElement),
      (this.options = this.extend(this.defaults, e)),
      (this.styleBank = {}),
      1 == this.options.init && this.init();
  }
  var i = 1,
    o = (function() {
      return (
        t.requestAnimationFrame ||
        t.webkitRequestAnimationFrame ||
        t.mozRequestAnimationFrame ||
        function(e) {
          t.setTimeout(e, 1e3 / 60);
        }
      );
    })();
  return (
    (e.prototype = {
      defaults: {
        after: '0s',
        enter: 'bottom',
        move: '24px',
        over: '0.66s',
        easing: 'ease-in-out',
        opacity: 0,
        viewportFactor: 0.33,
        reset: !1,
        init: !0
      },
      init: function() {
        this.scrolled = !1;
        var e = this;
        (this.elems = Array.prototype.slice.call(
          this.docElem.querySelectorAll('[data-scroll-reveal]')
        )),
          this.elems.forEach(function(t, o) {
            var r = t.getAttribute('data-scroll-reveal-id');
            r || ((r = i++), t.setAttribute('data-scroll-reveal-id', r)),
              e.styleBank[r] || (e.styleBank[r] = t.getAttribute('style')),
              e.update(t);
          });
        var r = function(t) {
            e.scrolled ||
              ((e.scrolled = !0),
              o(function() {
                e._scrollPage();
              }));
          },
          n = function() {
            function t() {
              e._scrollPage(), (e.resizeTimeout = null);
            }
            e.resizeTimeout && clearTimeout(e.resizeTimeout),
              (e.resizeTimeout = setTimeout(t, 200));
          };
        t.addEventListener('scroll', r, !1),
          t.addEventListener('resize', n, !1);
      },
      _scrollPage: function() {
        var t = this;
        this.elems.forEach(function(e, i) {
          t.update(e);
        }),
          (this.scrolled = !1);
      },
      parseLanguage: function(t) {
        function e(t) {
          var e = [],
            i = ['from', 'the', 'and', 'then', 'but', 'with'];
          return (
            t.forEach(function(t, o) {
              i.indexOf(t) > -1 || e.push(t);
            }),
            e
          );
        }
        var i = t.getAttribute('data-scroll-reveal').split(/[, ]+/),
          o = {};
        return (
          (i = e(i)),
          i.forEach(function(t, e) {
            switch (t) {
              case 'enter':
                return void (o.enter = i[e + 1]);
              case 'after':
                return void (o.after = i[e + 1]);
              case 'wait':
                return void (o.after = i[e + 1]);
              case 'move':
                return void (o.move = i[e + 1]);
              case 'ease':
                return (o.move = i[e + 1]), void (o.ease = 'ease');
              case 'ease-in':
                return (o.move = i[e + 1]), void (o.easing = 'ease-in');
              case 'ease-in-out':
                return (o.move = i[e + 1]), void (o.easing = 'ease-in-out');
              case 'ease-out':
                return (o.move = i[e + 1]), void (o.easing = 'ease-out');
              case 'over':
                return void (o.over = i[e + 1]);
              default:
                return;
            }
          }),
          o
        );
      },
      update: function(t) {
        var e = this.genCSS(t),
          i = this.styleBank[t.getAttribute('data-scroll-reveal-id')];
        return (
          null != i ? (i += ';') : (i = ''),
          t.getAttribute('data-scroll-reveal-initialized') ||
            (t.setAttribute('style', i + e.initial),
            t.setAttribute('data-scroll-reveal-initialized', !0)),
          this.isElementInViewport(t, this.options.viewportFactor)
            ? t.getAttribute('data-scroll-reveal-complete')
              ? void 0
              : this.isElementInViewport(t, this.options.viewportFactor)
              ? (t.setAttribute('style', i + e.target + e.transition),
                void (
                  this.options.reset ||
                  setTimeout(function() {
                    '' != i
                      ? t.setAttribute('style', i)
                      : t.removeAttribute('style'),
                      t.setAttribute('data-scroll-reveal-complete', !0);
                  }, e.totalDuration)
                ))
              : void 0
            : void (
                this.options.reset &&
                t.setAttribute('style', i + e.initial + e.reset)
              )
        );
      },
      genCSS: function(t) {
        var e,
          i,
          o = this.parseLanguage(t);
        o.enter
          ? (('top' == o.enter || 'bottom' == o.enter) &&
              ((e = o.enter), (i = 'y')),
            ('left' == o.enter || 'right' == o.enter) &&
              ((e = o.enter), (i = 'x')))
          : (('top' == this.options.enter || 'bottom' == this.options.enter) &&
              ((e = this.options.enter), (i = 'y')),
            ('left' == this.options.enter || 'right' == this.options.enter) &&
              ((e = this.options.enter), (i = 'x'))),
          ('top' == e || 'left' == e) &&
            (o.move
              ? (o.move = '-' + o.move)
              : (o.move = '-' + this.options.move));
        var r = o.move || this.options.move,
          n = o.over || this.options.over,
          s = o.after || this.options.after,
          a = o.easing || this.options.easing,
          l = o.opacity || this.options.opacity,
          u =
            '-webkit-transition: -webkit-transform ' +
            n +
            ' ' +
            a +
            ' ' +
            s +
            ',  opacity ' +
            n +
            ' ' +
            a +
            ' ' +
            s +
            ';transition: transform ' +
            n +
            ' ' +
            a +
            ' ' +
            s +
            ', opacity ' +
            n +
            ' ' +
            a +
            ' ' +
            s +
            ';-webkit-perspective: 1000;-webkit-backface-visibility: hidden;',
          c =
            '-webkit-transition: -webkit-transform ' +
            n +
            ' ' +
            a +
            ' 0s,  opacity ' +
            n +
            ' ' +
            a +
            ' ' +
            s +
            ';transition: transform ' +
            n +
            ' ' +
            a +
            ' 0s,  opacity ' +
            n +
            ' ' +
            a +
            ' ' +
            s +
            ';-webkit-perspective: 1000;-webkit-backface-visibility: hidden;',
          f =
            '-webkit-transform: translate' +
            i +
            '(' +
            r +
            ');transform: translate' +
            i +
            '(' +
            r +
            ');opacity: ' +
            l +
            ';',
          p =
            '-webkit-transform: translate' +
            i +
            '(0);transform: translate' +
            i +
            '(0);opacity: 1;';
        return {
          transition: u,
          initial: f,
          target: p,
          reset: c,
          totalDuration: 1e3 * (parseFloat(n) + parseFloat(s))
        };
      },
      getViewportH: function() {
        var e = this.docElem.clientHeight,
          i = t.innerHeight;
        return i > e ? i : e;
      },
      getOffset: function(t) {
        var e = 0,
          i = 0;
        do
          isNaN(t.offsetTop) || (e += t.offsetTop),
            isNaN(t.offsetLeft) || (i += t.offsetLeft);
        while ((t = t.offsetParent));
        return { top: e, left: i };
      },
      isElementInViewport: function(e, i) {
        var o = t.pageYOffset,
          r = o + this.getViewportH(),
          n = e.offsetHeight,
          s = this.getOffset(e).top,
          a = s + n,
          i = i || 0;
        return (
          (r >= s + n * i && a >= o) ||
          'fixed' ==
            (e.currentStyle ? e.currentStyle : t.getComputedStyle(e, null))
              .position
        );
      },
      extend: function(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t;
      }
    }),
    e
  );
})(window);
