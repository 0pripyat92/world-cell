/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if ('undefined' == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery");
!(function (t) {
  'use strict';
  var e = jQuery.fn.jquery.split(' ')[0].split('.');
  if (
    (e[0] < 2 && e[1] < 9) ||
    (1 == e[0] && 9 == e[1] && e[2] < 1) ||
    3 < e[0]
  )
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4",
    );
})(),
  (function (n) {
    'use strict';
    (n.fn.emulateTransitionEnd = function (t) {
      var e = !1,
        i = this;
      n(this).one('bsTransitionEnd', function () {
        e = !0;
      });
      return (
        setTimeout(function () {
          e || n(i).trigger(n.support.transition.end);
        }, t),
        this
      );
    }),
      n(function () {
        (n.support.transition = (function o() {
          var t = document.createElement('bootstrap'),
            e = {
              WebkitTransition: 'webkitTransitionEnd',
              MozTransition: 'transitionend',
              OTransition: 'oTransitionEnd otransitionend',
              transition: 'transitionend',
            };
          for (var i in e) if (t.style[i] !== undefined) return { end: e[i] };
          return !1;
        })()),
          n.support.transition &&
            (n.event.special.bsTransitionEnd = {
              bindType: n.support.transition.end,
              delegateType: n.support.transition.end,
              handle: function (t) {
                if (n(t.target).is(this))
                  return t.handleObj.handler.apply(this, arguments);
              },
            });
      });
  })(jQuery),
  (function (s) {
    'use strict';
    var e = '[data-dismiss="alert"]',
      a = function (t) {
        s(t).on('click', e, this.close);
      };
    (a.VERSION = '3.4.1'),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.close = function (t) {
        var e = s(this),
          i = e.attr('data-target');
        i || (i = (i = e.attr('href')) && i.replace(/.*(?=#[^\s]*$)/, '')),
          (i = '#' === i ? [] : i);
        var o = s(document).find(i);
        function n() {
          o.detach().trigger('closed.bs.alert').remove();
        }
        t && t.preventDefault(),
          o.length || (o = e.closest('.alert')),
          o.trigger((t = s.Event('close.bs.alert'))),
          t.isDefaultPrevented() ||
            (o.removeClass('in'),
            s.support.transition && o.hasClass('fade')
              ? o
                  .one('bsTransitionEnd', n)
                  .emulateTransitionEnd(a.TRANSITION_DURATION)
              : n());
      });
    var t = s.fn.alert;
    (s.fn.alert = function o(i) {
      return this.each(function () {
        var t = s(this),
          e = t.data('bs.alert');
        e || t.data('bs.alert', (e = new a(this))),
          'string' == typeof i && e[i].call(t);
      });
    }),
      (s.fn.alert.Constructor = a),
      (s.fn.alert.noConflict = function () {
        return (s.fn.alert = t), this;
      }),
      s(document).on('click.bs.alert.data-api', e, a.prototype.close);
  })(jQuery),
  (function (s) {
    'use strict';
    var n = function (t, e) {
      (this.$element = s(t)),
        (this.options = s.extend({}, n.DEFAULTS, e)),
        (this.isLoading = !1);
    };
    function i(o) {
      return this.each(function () {
        var t = s(this),
          e = t.data('bs.button'),
          i = 'object' == typeof o && o;
        e || t.data('bs.button', (e = new n(this, i))),
          'toggle' == o ? e.toggle() : o && e.setState(o);
      });
    }
    (n.VERSION = '3.4.1'),
      (n.DEFAULTS = { loadingText: 'loading...' }),
      (n.prototype.setState = function (t) {
        var e = 'disabled',
          i = this.$element,
          o = i.is('input') ? 'val' : 'html',
          n = i.data();
        (t += 'Text'),
          null == n.resetText && i.data('resetText', i[o]()),
          setTimeout(
            s.proxy(function () {
              i[o](null == n[t] ? this.options[t] : n[t]),
                'loadingText' == t
                  ? ((this.isLoading = !0),
                    i.addClass(e).attr(e, e).prop(e, !0))
                  : this.isLoading &&
                    ((this.isLoading = !1),
                    i.removeClass(e).removeAttr(e).prop(e, !1));
            }, this),
            0,
          );
      }),
      (n.prototype.toggle = function () {
        var t = !0,
          e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
          var i = this.$element.find('input');
          'radio' == i.prop('type')
            ? (i.prop('checked') && (t = !1),
              e.find('.active').removeClass('active'),
              this.$element.addClass('active'))
            : 'checkbox' == i.prop('type') &&
              (i.prop('checked') !== this.$element.hasClass('active') &&
                (t = !1),
              this.$element.toggleClass('active')),
            i.prop('checked', this.$element.hasClass('active')),
            t && i.trigger('change');
        } else
          this.$element.attr('aria-pressed', !this.$element.hasClass('active')),
            this.$element.toggleClass('active');
      });
    var t = s.fn.button;
    (s.fn.button = i),
      (s.fn.button.Constructor = n),
      (s.fn.button.noConflict = function () {
        return (s.fn.button = t), this;
      }),
      s(document)
        .on(
          'click.bs.button.data-api',
          '[data-toggle^="button"]',
          function (t) {
            var e = s(t.target).closest('.btn');
            i.call(e, 'toggle'),
              s(t.target).is('input[type="radio"], input[type="checkbox"]') ||
                (t.preventDefault(),
                e.is('input,button')
                  ? e.trigger('focus')
                  : e
                      .find('input:visible,button:visible')
                      .first()
                      .trigger('focus'));
          },
        )
        .on(
          'focus.bs.button.data-api blur.bs.button.data-api',
          '[data-toggle^="button"]',
          function (t) {
            s(t.target)
              .closest('.btn')
              .toggleClass('focus', /^focus(in)?$/.test(t.type));
          },
        );
  })(jQuery),
  (function (p) {
    'use strict';
    var c = function (t, e) {
      (this.$element = p(t)),
        (this.$indicators = this.$element.find('.carousel-indicators')),
        (this.options = e),
        (this.paused = null),
        (this.sliding = null),
        (this.interval = null),
        (this.$active = null),
        (this.$items = null),
        this.options.keyboard &&
          this.$element.on('keydown.bs.carousel', p.proxy(this.keydown, this)),
        'hover' == this.options.pause &&
          !('ontouchstart' in document.documentElement) &&
          this.$element
            .on('mouseenter.bs.carousel', p.proxy(this.pause, this))
            .on('mouseleave.bs.carousel', p.proxy(this.cycle, this));
    };
    function r(n) {
      return this.each(function () {
        var t = p(this),
          e = t.data('bs.carousel'),
          i = p.extend({}, c.DEFAULTS, t.data(), 'object' == typeof n && n),
          o = 'string' == typeof n ? n : i.slide;
        e || t.data('bs.carousel', (e = new c(this, i))),
          'number' == typeof n
            ? e.to(n)
            : o
            ? e[o]()
            : i.interval && e.pause().cycle();
      });
    }
    (c.VERSION = '3.4.1'),
      (c.TRANSITION_DURATION = 600),
      (c.DEFAULTS = { interval: 5e3, pause: 'hover', wrap: !0, keyboard: !0 }),
      (c.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
          switch (t.which) {
            case 37:
              this.prev();
              break;
            case 39:
              this.next();
              break;
            default:
              return;
          }
          t.preventDefault();
        }
      }),
      (c.prototype.cycle = function (t) {
        return (
          t || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              p.proxy(this.next, this),
              this.options.interval,
            )),
          this
        );
      }),
      (c.prototype.getItemIndex = function (t) {
        return (
          (this.$items = t.parent().children('.item')),
          this.$items.index(t || this.$active)
        );
      }),
      (c.prototype.getItemForDirection = function (t, e) {
        var i = this.getItemIndex(e);
        if (
          (('prev' == t && 0 === i) ||
            ('next' == t && i == this.$items.length - 1)) &&
          !this.options.wrap
        )
          return e;
        var o = (i + ('prev' == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(o);
      }),
      (c.prototype.to = function (t) {
        var e = this,
          i = this.getItemIndex(
            (this.$active = this.$element.find('.item.active')),
          );
        if (!(t > this.$items.length - 1 || t < 0))
          return this.sliding
            ? this.$element.one('slid.bs.carousel', function () {
                e.to(t);
              })
            : i == t
            ? this.pause().cycle()
            : this.slide(i < t ? 'next' : 'prev', this.$items.eq(t));
      }),
      (c.prototype.pause = function (t) {
        return (
          t || (this.paused = !0),
          this.$element.find('.next, .prev').length &&
            p.support.transition &&
            (this.$element.trigger(p.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (c.prototype.next = function () {
        if (!this.sliding) return this.slide('next');
      }),
      (c.prototype.prev = function () {
        if (!this.sliding) return this.slide('prev');
      }),
      (c.prototype.slide = function (t, e) {
        var i = this.$element.find('.item.active'),
          o = e || this.getItemForDirection(t, i),
          n = this.interval,
          s = 'next' == t ? 'left' : 'right',
          a = this;
        if (o.hasClass('active')) return (this.sliding = !1);
        var r = o[0],
          l = p.Event('slide.bs.carousel', { relatedTarget: r, direction: s });
        if ((this.$element.trigger(l), !l.isDefaultPrevented())) {
          if (
            ((this.sliding = !0), n && this.pause(), this.$indicators.length)
          ) {
            this.$indicators.find('.active').removeClass('active');
            var h = p(this.$indicators.children()[this.getItemIndex(o)]);
            h && h.addClass('active');
          }
          var d = p.Event('slid.bs.carousel', {
            relatedTarget: r,
            direction: s,
          });
          return (
            p.support.transition && this.$element.hasClass('slide')
              ? (o.addClass(t),
                'object' == typeof o && o.length && o[0].offsetWidth,
                i.addClass(s),
                o.addClass(s),
                i
                  .one('bsTransitionEnd', function () {
                    o.removeClass([t, s].join(' ')).addClass('active'),
                      i.removeClass(['active', s].join(' ')),
                      (a.sliding = !1),
                      setTimeout(function () {
                        a.$element.trigger(d);
                      }, 0);
                  })
                  .emulateTransitionEnd(c.TRANSITION_DURATION))
              : (i.removeClass('active'),
                o.addClass('active'),
                (this.sliding = !1),
                this.$element.trigger(d)),
            n && this.cycle(),
            this
          );
        }
      });
    var t = p.fn.carousel;
    (p.fn.carousel = r),
      (p.fn.carousel.Constructor = c),
      (p.fn.carousel.noConflict = function () {
        return (p.fn.carousel = t), this;
      });
    var e = function (t) {
      var e = p(this),
        i = e.attr('href');
      i && (i = i.replace(/.*(?=#[^\s]+$)/, ''));
      var o = e.attr('data-target') || i,
        n = p(document).find(o);
      if (n.hasClass('carousel')) {
        var s = p.extend({}, n.data(), e.data()),
          a = e.attr('data-slide-to');
        a && (s.interval = !1),
          r.call(n, s),
          a && n.data('bs.carousel').to(a),
          t.preventDefault();
      }
    };
    p(document)
      .on('click.bs.carousel.data-api', '[data-slide]', e)
      .on('click.bs.carousel.data-api', '[data-slide-to]', e),
      p(window).on('load', function () {
        p('[data-ride="carousel"]').each(function () {
          var t = p(this);
          r.call(t, t.data());
        });
      });
  })(jQuery),
  (function (a) {
    'use strict';
    var r = function (t, e) {
      (this.$element = a(t)),
        (this.options = a.extend({}, r.DEFAULTS, e)),
        (this.$trigger = a(
          '[data-toggle="collapse"][href="#' +
            t.id +
            '"],[data-toggle="collapse"][data-target="#' +
            t.id +
            '"]',
        )),
        (this.transitioning = null),
        this.options.parent
          ? (this.$parent = this.getParent())
          : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    function n(t) {
      var e,
        i =
          t.attr('data-target') ||
          ((e = t.attr('href')) && e.replace(/.*(?=#[^\s]+$)/, ''));
      return a(document).find(i);
    }
    function l(o) {
      return this.each(function () {
        var t = a(this),
          e = t.data('bs.collapse'),
          i = a.extend({}, r.DEFAULTS, t.data(), 'object' == typeof o && o);
        !e && i.toggle && /show|hide/.test(o) && (i.toggle = !1),
          e || t.data('bs.collapse', (e = new r(this, i))),
          'string' == typeof o && e[o]();
      });
    }
    (r.VERSION = '3.4.1'),
      (r.TRANSITION_DURATION = 350),
      (r.DEFAULTS = { toggle: !0 }),
      (r.prototype.dimension = function () {
        return this.$element.hasClass('width') ? 'width' : 'height';
      }),
      (r.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass('in')) {
          var t,
            e =
              this.$parent &&
              this.$parent.children('.panel').children('.in, .collapsing');
          if (
            !(e && e.length && (t = e.data('bs.collapse')) && t.transitioning)
          ) {
            var i = a.Event('show.bs.collapse');
            if ((this.$element.trigger(i), !i.isDefaultPrevented())) {
              e &&
                e.length &&
                (l.call(e, 'hide'), t || e.data('bs.collapse', null));
              var o = this.dimension();
              this.$element
                .removeClass('collapse')
                .addClass('collapsing')
                [o](0)
                .attr('aria-expanded', !0),
                this.$trigger
                  .removeClass('collapsed')
                  .attr('aria-expanded', !0),
                (this.transitioning = 1);
              var n = function () {
                this.$element
                  .removeClass('collapsing')
                  .addClass('collapse in')
                  [o](''),
                  (this.transitioning = 0),
                  this.$element.trigger('shown.bs.collapse');
              };
              if (!a.support.transition) return n.call(this);
              var s = a.camelCase(['scroll', o].join('-'));
              this.$element
                .one('bsTransitionEnd', a.proxy(n, this))
                .emulateTransitionEnd(r.TRANSITION_DURATION)
                [o](this.$element[0][s]);
            }
          }
        }
      }),
      (r.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass('in')) {
          var t = a.Event('hide.bs.collapse');
          if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
            var e = this.dimension();
            this.$element[e](this.$element[e]())[0].offsetHeight,
              this.$element
                .addClass('collapsing')
                .removeClass('collapse in')
                .attr('aria-expanded', !1),
              this.$trigger.addClass('collapsed').attr('aria-expanded', !1),
              (this.transitioning = 1);
            var i = function () {
              (this.transitioning = 0),
                this.$element
                  .removeClass('collapsing')
                  .addClass('collapse')
                  .trigger('hidden.bs.collapse');
            };
            if (!a.support.transition) return i.call(this);
            this.$element[e](0)
              .one('bsTransitionEnd', a.proxy(i, this))
              .emulateTransitionEnd(r.TRANSITION_DURATION);
          }
        }
      }),
      (r.prototype.toggle = function () {
        this[this.$element.hasClass('in') ? 'hide' : 'show']();
      }),
      (r.prototype.getParent = function () {
        return a(document)
          .find(this.options.parent)
          .find(
            '[data-toggle="collapse"][data-parent="' +
              this.options.parent +
              '"]',
          )
          .each(
            a.proxy(function (t, e) {
              var i = a(e);
              this.addAriaAndCollapsedClass(n(i), i);
            }, this),
          )
          .end();
      }),
      (r.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass('in');
        t.attr('aria-expanded', i),
          e.toggleClass('collapsed', !i).attr('aria-expanded', i);
      });
    var t = a.fn.collapse;
    (a.fn.collapse = l),
      (a.fn.collapse.Constructor = r),
      (a.fn.collapse.noConflict = function () {
        return (a.fn.collapse = t), this;
      }),
      a(document).on(
        'click.bs.collapse.data-api',
        '[data-toggle="collapse"]',
        function (t) {
          var e = a(this);
          e.attr('data-target') || t.preventDefault();
          var i = n(e),
            o = i.data('bs.collapse') ? 'toggle' : e.data();
          l.call(i, o);
        },
      );
  })(jQuery),
  (function (a) {
    'use strict';
    var r = '[data-toggle="dropdown"]',
      o = function (t) {
        a(t).on('click.bs.dropdown', this.toggle);
      };
    function l(t) {
      var e = t.attr('data-target');
      e ||
        (e =
          (e = t.attr('href')) &&
          /#[A-Za-z]/.test(e) &&
          e.replace(/.*(?=#[^\s]*$)/, ''));
      var i = '#' !== e ? a(document).find(e) : null;
      return i && i.length ? i : t.parent();
    }
    function s(o) {
      (o && 3 === o.which) ||
        (a('.dropdown-backdrop').remove(),
        a(r).each(function () {
          var t = a(this),
            e = l(t),
            i = { relatedTarget: this };
          e.hasClass('open') &&
            ((o &&
              'click' == o.type &&
              /input|textarea/i.test(o.target.tagName) &&
              a.contains(e[0], o.target)) ||
              (e.trigger((o = a.Event('hide.bs.dropdown', i))),
              o.isDefaultPrevented() ||
                (t.attr('aria-expanded', 'false'),
                e
                  .removeClass('open')
                  .trigger(a.Event('hidden.bs.dropdown', i)))));
        }));
    }
    (o.VERSION = '3.4.1'),
      (o.prototype.toggle = function (t) {
        var e = a(this);
        if (!e.is('.disabled, :disabled')) {
          var i = l(e),
            o = i.hasClass('open');
          if ((s(), !o)) {
            'ontouchstart' in document.documentElement &&
              !i.closest('.navbar-nav').length &&
              a(document.createElement('div'))
                .addClass('dropdown-backdrop')
                .insertAfter(a(this))
                .on('click', s);
            var n = { relatedTarget: this };
            if (
              (i.trigger((t = a.Event('show.bs.dropdown', n))),
              t.isDefaultPrevented())
            )
              return;
            e.trigger('focus').attr('aria-expanded', 'true'),
              i.toggleClass('open').trigger(a.Event('shown.bs.dropdown', n));
          }
          return !1;
        }
      }),
      (o.prototype.keydown = function (t) {
        if (
          /(38|40|27|32)/.test(t.which) &&
          !/input|textarea/i.test(t.target.tagName)
        ) {
          var e = a(this);
          if (
            (t.preventDefault(),
            t.stopPropagation(),
            !e.is('.disabled, :disabled'))
          ) {
            var i = l(e),
              o = i.hasClass('open');
            if ((!o && 27 != t.which) || (o && 27 == t.which))
              return (
                27 == t.which && i.find(r).trigger('focus'), e.trigger('click')
              );
            var n = i.find('.dropdown-menu li:not(.disabled):visible a');
            if (n.length) {
              var s = n.index(t.target);
              38 == t.which && 0 < s && s--,
                40 == t.which && s < n.length - 1 && s++,
                ~s || (s = 0),
                n.eq(s).trigger('focus');
            }
          }
        }
      });
    var t = a.fn.dropdown;
    (a.fn.dropdown = function e(i) {
      return this.each(function () {
        var t = a(this),
          e = t.data('bs.dropdown');
        e || t.data('bs.dropdown', (e = new o(this))),
          'string' == typeof i && e[i].call(t);
      });
    }),
      (a.fn.dropdown.Constructor = o),
      (a.fn.dropdown.noConflict = function () {
        return (a.fn.dropdown = t), this;
      }),
      a(document)
        .on('click.bs.dropdown.data-api', s)
        .on('click.bs.dropdown.data-api', '.dropdown form', function (t) {
          t.stopPropagation();
        })
        .on('click.bs.dropdown.data-api', r, o.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', r, o.prototype.keydown)
        .on(
          'keydown.bs.dropdown.data-api',
          '.dropdown-menu',
          o.prototype.keydown,
        );
  })(jQuery),
  (function (a) {
    'use strict';
    var s = function (t, e) {
      (this.options = e),
        (this.$body = a(document.body)),
        (this.$element = a(t)),
        (this.$dialog = this.$element.find('.modal-dialog')),
        (this.$backdrop = null),
        (this.isShown = null),
        (this.originalBodyPad = null),
        (this.scrollbarWidth = 0),
        (this.ignoreBackdropClick = !1),
        (this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'),
        this.options.remote &&
          this.$element.find('.modal-content').load(
            this.options.remote,
            a.proxy(function () {
              this.$element.trigger('loaded.bs.modal');
            }, this),
          );
    };
    function r(o, n) {
      return this.each(function () {
        var t = a(this),
          e = t.data('bs.modal'),
          i = a.extend({}, s.DEFAULTS, t.data(), 'object' == typeof o && o);
        e || t.data('bs.modal', (e = new s(this, i))),
          'string' == typeof o ? e[o](n) : i.show && e.show(n);
      });
    }
    (s.VERSION = '3.4.1'),
      (s.TRANSITION_DURATION = 300),
      (s.BACKDROP_TRANSITION_DURATION = 150),
      (s.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (s.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t);
      }),
      (s.prototype.show = function (i) {
        var o = this,
          t = a.Event('show.bs.modal', { relatedTarget: i });
        this.$element.trigger(t),
          this.isShown ||
            t.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass('modal-open'),
            this.escape(),
            this.resize(),
            this.$element.on(
              'click.dismiss.bs.modal',
              '[data-dismiss="modal"]',
              a.proxy(this.hide, this),
            ),
            this.$dialog.on('mousedown.dismiss.bs.modal', function () {
              o.$element.one('mouseup.dismiss.bs.modal', function (t) {
                a(t.target).is(o.$element) && (o.ignoreBackdropClick = !0);
              });
            }),
            this.backdrop(function () {
              var t = a.support.transition && o.$element.hasClass('fade');
              o.$element.parent().length || o.$element.appendTo(o.$body),
                o.$element.show().scrollTop(0),
                o.adjustDialog(),
                t && o.$element[0].offsetWidth,
                o.$element.addClass('in'),
                o.enforceFocus();
              var e = a.Event('shown.bs.modal', { relatedTarget: i });
              t
                ? o.$dialog
                    .one('bsTransitionEnd', function () {
                      o.$element.trigger('focus').trigger(e);
                    })
                    .emulateTransitionEnd(s.TRANSITION_DURATION)
                : o.$element.trigger('focus').trigger(e);
            }));
      }),
      (s.prototype.hide = function (t) {
        t && t.preventDefault(),
          (t = a.Event('hide.bs.modal')),
          this.$element.trigger(t),
          this.isShown &&
            !t.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            a(document).off('focusin.bs.modal'),
            this.$element
              .removeClass('in')
              .off('click.dismiss.bs.modal')
              .off('mouseup.dismiss.bs.modal'),
            this.$dialog.off('mousedown.dismiss.bs.modal'),
            a.support.transition && this.$element.hasClass('fade')
              ? this.$element
                  .one('bsTransitionEnd', a.proxy(this.hideModal, this))
                  .emulateTransitionEnd(s.TRANSITION_DURATION)
              : this.hideModal());
      }),
      (s.prototype.enforceFocus = function () {
        a(document)
          .off('focusin.bs.modal')
          .on(
            'focusin.bs.modal',
            a.proxy(function (t) {
              document === t.target ||
                this.$element[0] === t.target ||
                this.$element.has(t.target).length ||
                this.$element.trigger('focus');
            }, this),
          );
      }),
      (s.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              'keydown.dismiss.bs.modal',
              a.proxy(function (t) {
                27 == t.which && this.hide();
              }, this),
            )
          : this.isShown || this.$element.off('keydown.dismiss.bs.modal');
      }),
      (s.prototype.resize = function () {
        this.isShown
          ? a(window).on('resize.bs.modal', a.proxy(this.handleUpdate, this))
          : a(window).off('resize.bs.modal');
      }),
      (s.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(),
          this.backdrop(function () {
            t.$body.removeClass('modal-open'),
              t.resetAdjustments(),
              t.resetScrollbar(),
              t.$element.trigger('hidden.bs.modal');
          });
      }),
      (s.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (s.prototype.backdrop = function (t) {
        var e = this,
          i = this.$element.hasClass('fade') ? 'fade' : '';
        if (this.isShown && this.options.backdrop) {
          var o = a.support.transition && i;
          if (
            ((this.$backdrop = a(document.createElement('div'))
              .addClass('modal-backdrop ' + i)
              .appendTo(this.$body)),
            this.$element.on(
              'click.dismiss.bs.modal',
              a.proxy(function (t) {
                this.ignoreBackdropClick
                  ? (this.ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    ('static' == this.options.backdrop
                      ? this.$element[0].focus()
                      : this.hide());
              }, this),
            ),
            o && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass('in'),
            !t)
          )
            return;
          o
            ? this.$backdrop
                .one('bsTransitionEnd', t)
                .emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION)
            : t();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in');
          var n = function () {
            e.removeBackdrop(), t && t();
          };
          a.support.transition && this.$element.hasClass('fade')
            ? this.$backdrop
                .one('bsTransitionEnd', n)
                .emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION)
            : n();
        } else t && t();
      }),
      (s.prototype.handleUpdate = function () {
        this.adjustDialog();
      }),
      (s.prototype.adjustDialog = function () {
        var t =
          this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : '',
          paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : '',
        });
      }),
      (s.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: '', paddingRight: '' });
      }),
      (s.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
          var e = document.documentElement.getBoundingClientRect();
          t = e.right - Math.abs(e.left);
        }
        (this.bodyIsOverflowing = document.body.clientWidth < t),
          (this.scrollbarWidth = this.measureScrollbar());
      }),
      (s.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css('padding-right') || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        var n = this.scrollbarWidth;
        this.bodyIsOverflowing &&
          (this.$body.css('padding-right', t + n),
          a(this.fixedContent).each(function (t, e) {
            var i = e.style.paddingRight,
              o = a(e).css('padding-right');
            a(e)
              .data('padding-right', i)
              .css('padding-right', parseFloat(o) + n + 'px');
          }));
      }),
      (s.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad),
          a(this.fixedContent).each(function (t, e) {
            var i = a(e).data('padding-right');
            a(e).removeData('padding-right'), (e.style.paddingRight = i || '');
          });
      }),
      (s.prototype.measureScrollbar = function () {
        var t = document.createElement('div');
        (t.className = 'modal-scrollbar-measure'), this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e;
      });
    var t = a.fn.modal;
    (a.fn.modal = r),
      (a.fn.modal.Constructor = s),
      (a.fn.modal.noConflict = function () {
        return (a.fn.modal = t), this;
      }),
      a(document).on(
        'click.bs.modal.data-api',
        '[data-toggle="modal"]',
        function (t) {
          var e = a(this),
            i = e.attr('href'),
            o = e.attr('data-target') || (i && i.replace(/.*(?=#[^\s]+$)/, '')),
            n = a(document).find(o),
            s = n.data('bs.modal')
              ? 'toggle'
              : a.extend({ remote: !/#/.test(i) && i }, n.data(), e.data());
          e.is('a') && t.preventDefault(),
            n.one('show.bs.modal', function (t) {
              t.isDefaultPrevented() ||
                n.one('hidden.bs.modal', function () {
                  e.is(':visible') && e.trigger('focus');
                });
            }),
            r.call(n, s, this);
        },
      );
  })(jQuery),
  (function (g) {
    'use strict';
    var o = ['sanitize', 'whiteList', 'sanitizeFn'],
      a = [
        'background',
        'cite',
        'href',
        'itemtype',
        'longdesc',
        'poster',
        'src',
        'xlink:href',
      ],
      t = {
        '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
        a: ['target', 'href', 'title', 'rel'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      r = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
      l =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function u(t, e) {
      var i = t.nodeName.toLowerCase();
      if (-1 !== g.inArray(i, e))
        return (
          -1 === g.inArray(i, a) ||
          Boolean(t.nodeValue.match(r) || t.nodeValue.match(l))
        );
      for (
        var o = g(e).filter(function (t, e) {
            return e instanceof RegExp;
          }),
          n = 0,
          s = o.length;
        n < s;
        n++
      )
        if (i.match(o[n])) return !0;
      return !1;
    }
    function n(t, e, i) {
      if (0 === t.length) return t;
      if (i && 'function' == typeof i) return i(t);
      if (
        !document.implementation ||
        !document.implementation.createHTMLDocument
      )
        return t;
      var o = document.implementation.createHTMLDocument('sanitization');
      o.body.innerHTML = t;
      for (
        var n = g.map(e, function (t, e) {
            return e;
          }),
          s = g(o.body).find('*'),
          a = 0,
          r = s.length;
        a < r;
        a++
      ) {
        var l = s[a],
          h = l.nodeName.toLowerCase();
        if (-1 !== g.inArray(h, n))
          for (
            var d = g.map(l.attributes, function (t) {
                return t;
              }),
              p = [].concat(e['*'] || [], e[h] || []),
              c = 0,
              f = d.length;
            c < f;
            c++
          )
            u(d[c], p) || l.removeAttribute(d[c].nodeName);
        else l.parentNode.removeChild(l);
      }
      return o.body.innerHTML;
    }
    var m = function (t, e) {
      (this.type = null),
        (this.options = null),
        (this.enabled = null),
        (this.timeout = null),
        (this.hoverState = null),
        (this.$element = null),
        (this.inState = null),
        this.init('tooltip', t, e);
    };
    (m.VERSION = '3.4.1'),
      (m.TRANSITION_DURATION = 150),
      (m.DEFAULTS = {
        animation: !0,
        placement: 'top',
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: 'body', padding: 0 },
        sanitize: !0,
        sanitizeFn: null,
        whiteList: t,
      }),
      (m.prototype.init = function (t, e, i) {
        if (
          ((this.enabled = !0),
          (this.type = t),
          (this.$element = g(e)),
          (this.options = this.getOptions(i)),
          (this.$viewport =
            this.options.viewport &&
            g(document).find(
              g.isFunction(this.options.viewport)
                ? this.options.viewport.call(this, this.$element)
                : this.options.viewport.selector || this.options.viewport,
            )),
          (this.inState = { click: !1, hover: !1, focus: !1 }),
          this.$element[0] instanceof document.constructor &&
            !this.options.selector)
        )
          throw new Error(
            '`selector` option must be specified when initializing ' +
              this.type +
              ' on the window.document object!',
          );
        for (var o = this.options.trigger.split(' '), n = o.length; n--; ) {
          var s = o[n];
          if ('click' == s)
            this.$element.on(
              'click.' + this.type,
              this.options.selector,
              g.proxy(this.toggle, this),
            );
          else if ('manual' != s) {
            var a = 'hover' == s ? 'mouseenter' : 'focusin',
              r = 'hover' == s ? 'mouseleave' : 'focusout';
            this.$element.on(
              a + '.' + this.type,
              this.options.selector,
              g.proxy(this.enter, this),
            ),
              this.$element.on(
                r + '.' + this.type,
                this.options.selector,
                g.proxy(this.leave, this),
              );
          }
        }
        this.options.selector
          ? (this._options = g.extend({}, this.options, {
              trigger: 'manual',
              selector: '',
            }))
          : this.fixTitle();
      }),
      (m.prototype.getDefaults = function () {
        return m.DEFAULTS;
      }),
      (m.prototype.getOptions = function (t) {
        var e = this.$element.data();
        for (var i in e)
          e.hasOwnProperty(i) && -1 !== g.inArray(i, o) && delete e[i];
        return (
          (t = g.extend({}, this.getDefaults(), e, t)).delay &&
            'number' == typeof t.delay &&
            (t.delay = { show: t.delay, hide: t.delay }),
          t.sanitize && (t.template = n(t.template, t.whiteList, t.sanitizeFn)),
          t
        );
      }),
      (m.prototype.getDelegateOptions = function () {
        var i = {},
          o = this.getDefaults();
        return (
          this._options &&
            g.each(this._options, function (t, e) {
              o[t] != e && (i[t] = e);
            }),
          i
        );
      }),
      (m.prototype.enter = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : g(t.currentTarget).data('bs.' + this.type);
        if (
          (e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions(),
            )),
            g(t.currentTarget).data('bs.' + this.type, e)),
          t instanceof g.Event &&
            (e.inState['focusin' == t.type ? 'focus' : 'hover'] = !0),
          e.tip().hasClass('in') || 'in' == e.hoverState)
        )
          e.hoverState = 'in';
        else {
          if (
            (clearTimeout(e.timeout),
            (e.hoverState = 'in'),
            !e.options.delay || !e.options.delay.show)
          )
            return e.show();
          e.timeout = setTimeout(function () {
            'in' == e.hoverState && e.show();
          }, e.options.delay.show);
        }
      }),
      (m.prototype.isInStateTrue = function () {
        for (var t in this.inState) if (this.inState[t]) return !0;
        return !1;
      }),
      (m.prototype.leave = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : g(t.currentTarget).data('bs.' + this.type);
        if (
          (e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions(),
            )),
            g(t.currentTarget).data('bs.' + this.type, e)),
          t instanceof g.Event &&
            (e.inState['focusout' == t.type ? 'focus' : 'hover'] = !1),
          !e.isInStateTrue())
        ) {
          if (
            (clearTimeout(e.timeout),
            (e.hoverState = 'out'),
            !e.options.delay || !e.options.delay.hide)
          )
            return e.hide();
          e.timeout = setTimeout(function () {
            'out' == e.hoverState && e.hide();
          }, e.options.delay.hide);
        }
      }),
      (m.prototype.show = function () {
        var t = g.Event('show.bs.' + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(t);
          var e = g.contains(
            this.$element[0].ownerDocument.documentElement,
            this.$element[0],
          );
          if (t.isDefaultPrevented() || !e) return;
          var i = this,
            o = this.tip(),
            n = this.getUID(this.type);
          this.setContent(),
            o.attr('id', n),
            this.$element.attr('aria-describedby', n),
            this.options.animation && o.addClass('fade');
          var s =
              'function' == typeof this.options.placement
                ? this.options.placement.call(this, o[0], this.$element[0])
                : this.options.placement,
            a = /\s?auto?\s?/i,
            r = a.test(s);
          r && (s = s.replace(a, '') || 'top'),
            o
              .detach()
              .css({ top: 0, left: 0, display: 'block' })
              .addClass(s)
              .data('bs.' + this.type, this),
            this.options.container
              ? o.appendTo(g(document).find(this.options.container))
              : o.insertAfter(this.$element),
            this.$element.trigger('inserted.bs.' + this.type);
          var l = this.getPosition(),
            h = o[0].offsetWidth,
            d = o[0].offsetHeight;
          if (r) {
            var p = s,
              c = this.getPosition(this.$viewport);
            (s =
              'bottom' == s && l.bottom + d > c.bottom
                ? 'top'
                : 'top' == s && l.top - d < c.top
                ? 'bottom'
                : 'right' == s && l.right + h > c.width
                ? 'left'
                : 'left' == s && l.left - h < c.left
                ? 'right'
                : s),
              o.removeClass(p).addClass(s);
          }
          var f = this.getCalculatedOffset(s, l, h, d);
          this.applyPlacement(f, s);
          var u = function () {
            var t = i.hoverState;
            i.$element.trigger('shown.bs.' + i.type),
              (i.hoverState = null),
              'out' == t && i.leave(i);
          };
          g.support.transition && this.$tip.hasClass('fade')
            ? o
                .one('bsTransitionEnd', u)
                .emulateTransitionEnd(m.TRANSITION_DURATION)
            : u();
        }
      }),
      (m.prototype.applyPlacement = function (t, e) {
        var i = this.tip(),
          o = i[0].offsetWidth,
          n = i[0].offsetHeight,
          s = parseInt(i.css('margin-top'), 10),
          a = parseInt(i.css('margin-left'), 10);
        isNaN(s) && (s = 0),
          isNaN(a) && (a = 0),
          (t.top += s),
          (t.left += a),
          g.offset.setOffset(
            i[0],
            g.extend(
              {
                using: function (t) {
                  i.css({ top: Math.round(t.top), left: Math.round(t.left) });
                },
              },
              t,
            ),
            0,
          ),
          i.addClass('in');
        var r = i[0].offsetWidth,
          l = i[0].offsetHeight;
        'top' == e && l != n && (t.top = t.top + n - l);
        var h = this.getViewportAdjustedDelta(e, t, r, l);
        h.left ? (t.left += h.left) : (t.top += h.top);
        var d = /top|bottom/.test(e),
          p = d ? 2 * h.left - o + r : 2 * h.top - n + l,
          c = d ? 'offsetWidth' : 'offsetHeight';
        i.offset(t), this.replaceArrow(p, i[0][c], d);
      }),
      (m.prototype.replaceArrow = function (t, e, i) {
        this.arrow()
          .css(i ? 'left' : 'top', 50 * (1 - t / e) + '%')
          .css(i ? 'top' : 'left', '');
      }),
      (m.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle();
        this.options.html
          ? (this.options.sanitize &&
              (e = n(e, this.options.whiteList, this.options.sanitizeFn)),
            t.find('.tooltip-inner').html(e))
          : t.find('.tooltip-inner').text(e),
          t.removeClass('fade in top bottom left right');
      }),
      (m.prototype.hide = function (t) {
        var e = this,
          i = g(this.$tip),
          o = g.Event('hide.bs.' + this.type);
        function n() {
          'in' != e.hoverState && i.detach(),
            e.$element &&
              e.$element
                .removeAttr('aria-describedby')
                .trigger('hidden.bs.' + e.type),
            t && t();
        }
        if ((this.$element.trigger(o), !o.isDefaultPrevented()))
          return (
            i.removeClass('in'),
            g.support.transition && i.hasClass('fade')
              ? i
                  .one('bsTransitionEnd', n)
                  .emulateTransitionEnd(m.TRANSITION_DURATION)
              : n(),
            (this.hoverState = null),
            this
          );
      }),
      (m.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr('title') || 'string' != typeof t.attr('data-original-title')) &&
          t
            .attr('data-original-title', t.attr('title') || '')
            .attr('title', '');
      }),
      (m.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (m.prototype.getPosition = function (t) {
        var e = (t = t || this.$element)[0],
          i = 'BODY' == e.tagName,
          o = e.getBoundingClientRect();
        null == o.width &&
          (o = g.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top,
          }));
        var n = window.SVGElement && e instanceof window.SVGElement,
          s = i ? { top: 0, left: 0 } : n ? null : t.offset(),
          a = {
            scroll: i
              ? document.documentElement.scrollTop || document.body.scrollTop
              : t.scrollTop(),
          },
          r = i
            ? { width: g(window).width(), height: g(window).height() }
            : null;
        return g.extend({}, o, a, r, s);
      }),
      (m.prototype.getCalculatedOffset = function (t, e, i, o) {
        return 'bottom' == t
          ? { top: e.top + e.height, left: e.left + e.width / 2 - i / 2 }
          : 'top' == t
          ? { top: e.top - o, left: e.left + e.width / 2 - i / 2 }
          : 'left' == t
          ? { top: e.top + e.height / 2 - o / 2, left: e.left - i }
          : { top: e.top + e.height / 2 - o / 2, left: e.left + e.width };
      }),
      (m.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
        var n = { top: 0, left: 0 };
        if (!this.$viewport) return n;
        var s = (this.options.viewport && this.options.viewport.padding) || 0,
          a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
          var r = e.top - s - a.scroll,
            l = e.top + s - a.scroll + o;
          r < a.top
            ? (n.top = a.top - r)
            : l > a.top + a.height && (n.top = a.top + a.height - l);
        } else {
          var h = e.left - s,
            d = e.left + s + i;
          h < a.left
            ? (n.left = a.left - h)
            : d > a.right && (n.left = a.left + a.width - d);
        }
        return n;
      }),
      (m.prototype.getTitle = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr('data-original-title') ||
          ('function' == typeof e.title ? e.title.call(t[0]) : e.title)
        );
      }),
      (m.prototype.getUID = function (t) {
        for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
        return t;
      }),
      (m.prototype.tip = function () {
        if (
          !this.$tip &&
          ((this.$tip = g(this.options.template)), 1 != this.$tip.length)
        )
          throw new Error(
            this.type +
              ' `template` option must consist of exactly 1 top-level element!',
          );
        return this.$tip;
      }),
      (m.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'));
      }),
      (m.prototype.enable = function () {
        this.enabled = !0;
      }),
      (m.prototype.disable = function () {
        this.enabled = !1;
      }),
      (m.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (m.prototype.toggle = function (t) {
        var e = this;
        t &&
          ((e = g(t.currentTarget).data('bs.' + this.type)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions(),
            )),
            g(t.currentTarget).data('bs.' + this.type, e))),
          t
            ? ((e.inState.click = !e.inState.click),
              e.isInStateTrue() ? e.enter(e) : e.leave(e))
            : e.tip().hasClass('in')
            ? e.leave(e)
            : e.enter(e);
      }),
      (m.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout),
          this.hide(function () {
            t.$element.off('.' + t.type).removeData('bs.' + t.type),
              t.$tip && t.$tip.detach(),
              (t.$tip = null),
              (t.$arrow = null),
              (t.$viewport = null),
              (t.$element = null);
          });
      }),
      (m.prototype.sanitizeHtml = function (t) {
        return n(t, this.options.whiteList, this.options.sanitizeFn);
      });
    var e = g.fn.tooltip;
    (g.fn.tooltip = function i(o) {
      return this.each(function () {
        var t = g(this),
          e = t.data('bs.tooltip'),
          i = 'object' == typeof o && o;
        (!e && /destroy|hide/.test(o)) ||
          (e || t.data('bs.tooltip', (e = new m(this, i))),
          'string' == typeof o && e[o]());
      });
    }),
      (g.fn.tooltip.Constructor = m),
      (g.fn.tooltip.noConflict = function () {
        return (g.fn.tooltip = e), this;
      });
  })(jQuery),
  (function (n) {
    'use strict';
    var s = function (t, e) {
      this.init('popover', t, e);
    };
    if (!n.fn.tooltip) throw new Error('Popover requires tooltip.js');
    (s.VERSION = '3.4.1'),
      (s.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (((s.prototype = n.extend(
        {},
        n.fn.tooltip.Constructor.prototype,
      )).constructor = s).prototype.getDefaults = function () {
        return s.DEFAULTS;
      }),
      (s.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle(),
          i = this.getContent();
        if (this.options.html) {
          var o = typeof i;
          this.options.sanitize &&
            ((e = this.sanitizeHtml(e)),
            'string' === o && (i = this.sanitizeHtml(i))),
            t.find('.popover-title').html(e),
            t
              .find('.popover-content')
              .children()
              .detach()
              .end()
              ['string' === o ? 'html' : 'append'](i);
        } else
          t.find('.popover-title').text(e),
            t.find('.popover-content').children().detach().end().text(i);
        t.removeClass('fade top bottom left right in'),
          t.find('.popover-title').html() || t.find('.popover-title').hide();
      }),
      (s.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (s.prototype.getContent = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr('data-content') ||
          ('function' == typeof e.content ? e.content.call(t[0]) : e.content)
        );
      }),
      (s.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'));
      });
    var t = n.fn.popover;
    (n.fn.popover = function e(o) {
      return this.each(function () {
        var t = n(this),
          e = t.data('bs.popover'),
          i = 'object' == typeof o && o;
        (!e && /destroy|hide/.test(o)) ||
          (e || t.data('bs.popover', (e = new s(this, i))),
          'string' == typeof o && e[o]());
      });
    }),
      (n.fn.popover.Constructor = s),
      (n.fn.popover.noConflict = function () {
        return (n.fn.popover = t), this;
      });
  })(jQuery),
  (function (s) {
    'use strict';
    function n(t, e) {
      (this.$body = s(document.body)),
        (this.$scrollElement = s(t).is(document.body) ? s(window) : s(t)),
        (this.options = s.extend({}, n.DEFAULTS, e)),
        (this.selector = (this.options.target || '') + ' .nav li > a'),
        (this.offsets = []),
        (this.targets = []),
        (this.activeTarget = null),
        (this.scrollHeight = 0),
        this.$scrollElement.on(
          'scroll.bs.scrollspy',
          s.proxy(this.process, this),
        ),
        this.refresh(),
        this.process();
    }
    function e(o) {
      return this.each(function () {
        var t = s(this),
          e = t.data('bs.scrollspy'),
          i = 'object' == typeof o && o;
        e || t.data('bs.scrollspy', (e = new n(this, i))),
          'string' == typeof o && e[o]();
      });
    }
    (n.VERSION = '3.4.1'),
      (n.DEFAULTS = { offset: 10 }),
      (n.prototype.getScrollHeight = function () {
        return (
          this.$scrollElement[0].scrollHeight ||
          Math.max(
            this.$body[0].scrollHeight,
            document.documentElement.scrollHeight,
          )
        );
      }),
      (n.prototype.refresh = function () {
        var t = this,
          o = 'offset',
          n = 0;
        (this.offsets = []),
          (this.targets = []),
          (this.scrollHeight = this.getScrollHeight()),
          s.isWindow(this.$scrollElement[0]) ||
            ((o = 'position'), (n = this.$scrollElement.scrollTop())),
          this.$body
            .find(this.selector)
            .map(function () {
              var t = s(this),
                e = t.data('target') || t.attr('href'),
                i = /^#./.test(e) && s(e);
              return (
                (i && i.length && i.is(':visible') && [[i[o]().top + n, e]]) ||
                null
              );
            })
            .sort(function (t, e) {
              return t[0] - e[0];
            })
            .each(function () {
              t.offsets.push(this[0]), t.targets.push(this[1]);
            });
      }),
      (n.prototype.process = function () {
        var t,
          e = this.$scrollElement.scrollTop() + this.options.offset,
          i = this.getScrollHeight(),
          o = this.options.offset + i - this.$scrollElement.height(),
          n = this.offsets,
          s = this.targets,
          a = this.activeTarget;
        if ((this.scrollHeight != i && this.refresh(), o <= e))
          return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0]) return (this.activeTarget = null), this.clear();
        for (t = n.length; t--; )
          a != s[t] &&
            e >= n[t] &&
            (n[t + 1] === undefined || e < n[t + 1]) &&
            this.activate(s[t]);
      }),
      (n.prototype.activate = function (t) {
        (this.activeTarget = t), this.clear();
        var e =
            this.selector +
            '[data-target="' +
            t +
            '"],' +
            this.selector +
            '[href="' +
            t +
            '"]',
          i = s(e).parents('li').addClass('active');
        i.parent('.dropdown-menu').length &&
          (i = i.closest('li.dropdown').addClass('active')),
          i.trigger('activate.bs.scrollspy');
      }),
      (n.prototype.clear = function () {
        s(this.selector)
          .parentsUntil(this.options.target, '.active')
          .removeClass('active');
      });
    var t = s.fn.scrollspy;
    (s.fn.scrollspy = e),
      (s.fn.scrollspy.Constructor = n),
      (s.fn.scrollspy.noConflict = function () {
        return (s.fn.scrollspy = t), this;
      }),
      s(window).on('load.bs.scrollspy.data-api', function () {
        s('[data-spy="scroll"]').each(function () {
          var t = s(this);
          e.call(t, t.data());
        });
      });
  })(jQuery),
  (function (r) {
    'use strict';
    var a = function (t) {
      this.element = r(t);
    };
    function e(i) {
      return this.each(function () {
        var t = r(this),
          e = t.data('bs.tab');
        e || t.data('bs.tab', (e = new a(this))),
          'string' == typeof i && e[i]();
      });
    }
    (a.VERSION = '3.4.1'),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.show = function () {
        var t = this.element,
          e = t.closest('ul:not(.dropdown-menu)'),
          i = t.data('target');
        if (
          (i || (i = (i = t.attr('href')) && i.replace(/.*(?=#[^\s]*$)/, '')),
          !t.parent('li').hasClass('active'))
        ) {
          var o = e.find('.active:last a'),
            n = r.Event('hide.bs.tab', { relatedTarget: t[0] }),
            s = r.Event('show.bs.tab', { relatedTarget: o[0] });
          if (
            (o.trigger(n),
            t.trigger(s),
            !s.isDefaultPrevented() && !n.isDefaultPrevented())
          ) {
            var a = r(document).find(i);
            this.activate(t.closest('li'), e),
              this.activate(a, a.parent(), function () {
                o.trigger({ type: 'hidden.bs.tab', relatedTarget: t[0] }),
                  t.trigger({ type: 'shown.bs.tab', relatedTarget: o[0] });
              });
          }
        }
      }),
      (a.prototype.activate = function (t, e, i) {
        var o = e.find('> .active'),
          n =
            i &&
            r.support.transition &&
            ((o.length && o.hasClass('fade')) || !!e.find('> .fade').length);
        function s() {
          o
            .removeClass('active')
            .find('> .dropdown-menu > .active')
            .removeClass('active')
            .end()
            .find('[data-toggle="tab"]')
            .attr('aria-expanded', !1),
            t
              .addClass('active')
              .find('[data-toggle="tab"]')
              .attr('aria-expanded', !0),
            n ? (t[0].offsetWidth, t.addClass('in')) : t.removeClass('fade'),
            t.parent('.dropdown-menu').length &&
              t
                .closest('li.dropdown')
                .addClass('active')
                .end()
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', !0),
            i && i();
        }
        o.length && n
          ? o
              .one('bsTransitionEnd', s)
              .emulateTransitionEnd(a.TRANSITION_DURATION)
          : s(),
          o.removeClass('in');
      });
    var t = r.fn.tab;
    (r.fn.tab = e),
      (r.fn.tab.Constructor = a),
      (r.fn.tab.noConflict = function () {
        return (r.fn.tab = t), this;
      });
    var i = function (t) {
      t.preventDefault(), e.call(r(this), 'show');
    };
    r(document)
      .on('click.bs.tab.data-api', '[data-toggle="tab"]', i)
      .on('click.bs.tab.data-api', '[data-toggle="pill"]', i);
  })(jQuery),
  (function (l) {
    'use strict';
    var h = function (t, e) {
      this.options = l.extend({}, h.DEFAULTS, e);
      var i =
        this.options.target === h.DEFAULTS.target
          ? l(this.options.target)
          : l(document).find(this.options.target);
      (this.$target = i
        .on('scroll.bs.affix.data-api', l.proxy(this.checkPosition, this))
        .on(
          'click.bs.affix.data-api',
          l.proxy(this.checkPositionWithEventLoop, this),
        )),
        (this.$element = l(t)),
        (this.affixed = null),
        (this.unpin = null),
        (this.pinnedOffset = null),
        this.checkPosition();
    };
    function i(o) {
      return this.each(function () {
        var t = l(this),
          e = t.data('bs.affix'),
          i = 'object' == typeof o && o;
        e || t.data('bs.affix', (e = new h(this, i))),
          'string' == typeof o && e[o]();
      });
    }
    (h.VERSION = '3.4.1'),
      (h.RESET = 'affix affix-top affix-bottom'),
      (h.DEFAULTS = { offset: 0, target: window }),
      (h.prototype.getState = function (t, e, i, o) {
        var n = this.$target.scrollTop(),
          s = this.$element.offset(),
          a = this.$target.height();
        if (null != i && 'top' == this.affixed) return n < i && 'top';
        if ('bottom' == this.affixed)
          return null != i
            ? !(n + this.unpin <= s.top) && 'bottom'
            : !(n + a <= t - o) && 'bottom';
        var r = null == this.affixed,
          l = r ? n : s.top;
        return null != i && n <= i
          ? 'top'
          : null != o && t - o <= l + (r ? a : e) && 'bottom';
      }),
      (h.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(h.RESET).addClass('affix');
        var t = this.$target.scrollTop(),
          e = this.$element.offset();
        return (this.pinnedOffset = e.top - t);
      }),
      (h.prototype.checkPositionWithEventLoop = function () {
        setTimeout(l.proxy(this.checkPosition, this), 1);
      }),
      (h.prototype.checkPosition = function () {
        if (this.$element.is(':visible')) {
          var t = this.$element.height(),
            e = this.options.offset,
            i = e.top,
            o = e.bottom,
            n = Math.max(l(document).height(), l(document.body).height());
          'object' != typeof e && (o = i = e),
            'function' == typeof i && (i = e.top(this.$element)),
            'function' == typeof o && (o = e.bottom(this.$element));
          var s = this.getState(n, t, i, o);
          if (this.affixed != s) {
            null != this.unpin && this.$element.css('top', '');
            var a = 'affix' + (s ? '-' + s : ''),
              r = l.Event(a + '.bs.affix');
            if ((this.$element.trigger(r), r.isDefaultPrevented())) return;
            (this.affixed = s),
              (this.unpin = 'bottom' == s ? this.getPinnedOffset() : null),
              this.$element
                .removeClass(h.RESET)
                .addClass(a)
                .trigger(a.replace('affix', 'affixed') + '.bs.affix');
          }
          'bottom' == s && this.$element.offset({ top: n - t - o });
        }
      });
    var t = l.fn.affix;
    (l.fn.affix = i),
      (l.fn.affix.Constructor = h),
      (l.fn.affix.noConflict = function () {
        return (l.fn.affix = t), this;
      }),
      l(window).on('load', function () {
        l('[data-spy="affix"]').each(function () {
          var t = l(this),
            e = t.data();
          (e.offset = e.offset || {}),
            null != e.offsetBottom && (e.offset.bottom = e.offsetBottom),
            null != e.offsetTop && (e.offset.top = e.offsetTop),
            i.call(t, e);
        });
      });
  })(jQuery);
// jQuery Mask Plugin v1.14.0
// github.com/igorescobar/jQuery-Mask-Plugin
(function (b) {
  'function' === typeof define && define.amd
    ? define(['jquery'], b)
    : 'object' === typeof exports
    ? (module.exports = b(require('jquery')))
    : b(jQuery || Zepto);
})(function (b) {
  var y = function (a, e, d) {
    var c = {
      invalid: [],
      getCaret: function () {
        try {
          var r,
            b = 0,
            e = a.get(0),
            d = document.selection,
            f = e.selectionStart;
          if (d && -1 === navigator.appVersion.indexOf('MSIE 10'))
            (r = d.createRange()),
              r.moveStart('character', -c.val().length),
              (b = r.text.length);
          else if (f || '0' === f) b = f;
          return b;
        } catch (g) {}
      },
      setCaret: function (r) {
        try {
          if (a.is(':focus')) {
            var c,
              b = a.get(0);
            b.setSelectionRange
              ? (b.focus(), b.setSelectionRange(r, r))
              : ((c = b.createTextRange()),
                c.collapse(!0),
                c.moveEnd('character', r),
                c.moveStart('character', r),
                c.select());
          }
        } catch (e) {}
      },
      events: function () {
        a.on('keydown.mask', function (c) {
          a.data('mask-keycode', c.keyCode || c.which);
        })
          .on(
            b.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask',
            c.behaviour,
          )
          .on('paste.mask drop.mask', function () {
            setTimeout(function () {
              a.keydown().keyup();
            }, 100);
          })
          .on('change.mask', function () {
            a.data('changed', !0);
          })
          .on('blur.mask', function () {
            n === c.val() || a.data('changed') || a.trigger('change');
            a.data('changed', !1);
          })
          .on('blur.mask', function () {
            n = c.val();
          })
          .on('focus.mask', function (a) {
            !0 === d.selectOnFocus && b(a.target).select();
          })
          .on('focusout.mask', function () {
            d.clearIfNotMatch && !p.test(c.val()) && c.val('');
          });
      },
      getRegexMask: function () {
        for (var a = [], c, b, d, f, l = 0; l < e.length; l++)
          (c = g.translation[e.charAt(l)])
            ? ((b = c.pattern.toString().replace(/.{1}$|^.{1}/g, '')),
              (d = c.optional),
              (c = c.recursive)
                ? (a.push(e.charAt(l)),
                  (f = { digit: e.charAt(l), pattern: b }))
                : a.push(d || c ? b + '?' : b))
            : a.push(e.charAt(l).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        a = a.join('');
        f &&
          (a = a
            .replace(
              new RegExp('(' + f.digit + '(.*' + f.digit + ')?)'),
              '($1)?',
            )
            .replace(new RegExp(f.digit, 'g'), f.pattern));
        return new RegExp(a);
      },
      destroyEvents: function () {
        a.off(
          'input keydown keyup paste drop blur focusout '
            .split(' ')
            .join('.mask '),
        );
      },
      val: function (c) {
        var b = a.is('input') ? 'val' : 'text';
        if (0 < arguments.length) {
          if (a[b]() !== c) a[b](c);
          b = a;
        } else b = a[b]();
        return b;
      },
      getMCharsBeforeCount: function (a, c) {
        for (var b = 0, d = 0, f = e.length; d < f && d < a; d++)
          g.translation[e.charAt(d)] || ((a = c ? a + 1 : a), b++);
        return b;
      },
      caretPos: function (a, b, d, h) {
        return g.translation[e.charAt(Math.min(a - 1, e.length - 1))]
          ? Math.min(a + d - b - h, d)
          : c.caretPos(a + 1, b, d, h);
      },
      behaviour: function (d) {
        d = d || window.event;
        c.invalid = [];
        var e = a.data('mask-keycode');
        if (-1 === b.inArray(e, g.byPassKeys)) {
          var m = c.getCaret(),
            h = c.val().length,
            f = c.getMasked(),
            l = f.length,
            k = c.getMCharsBeforeCount(l - 1) - c.getMCharsBeforeCount(h - 1),
            n = m < h;
          c.val(f);
          n &&
            (8 !== e && 46 !== e && (m = c.caretPos(m, h, l, k)),
            c.setCaret(m));
          return c.callbacks(d);
        }
      },
      getMasked: function (a, b) {
        var m = [],
          h = void 0 === b ? c.val() : b + '',
          f = 0,
          l = e.length,
          k = 0,
          n = h.length,
          q = 1,
          p = 'push',
          u = -1,
          t,
          w;
        d.reverse
          ? ((p = 'unshift'),
            (q = -1),
            (t = 0),
            (f = l - 1),
            (k = n - 1),
            (w = function () {
              return -1 < f && -1 < k;
            }))
          : ((t = l - 1),
            (w = function () {
              return f < l && k < n;
            }));
        for (; w(); ) {
          var x = e.charAt(f),
            v = h.charAt(k),
            s = g.translation[x];
          if (s)
            v.match(s.pattern)
              ? (m[p](v),
                s.recursive &&
                  (-1 === u ? (u = f) : f === t && (f = u - q),
                  t === u && (f -= q)),
                (f += q))
              : s.optional
              ? ((f += q), (k -= q))
              : s.fallback
              ? (m[p](s.fallback), (f += q), (k -= q))
              : c.invalid.push({ p: k, v: v, e: s.pattern }),
              (k += q);
          else {
            if (!a) m[p](x);
            v === x && (k += q);
            f += q;
          }
        }
        h = e.charAt(t);
        l !== n + 1 || g.translation[h] || m.push(h);
        return m.join('');
      },
      callbacks: function (b) {
        var g = c.val(),
          m = g !== n,
          h = [g, b, a, d],
          f = function (a, b, c) {
            'function' === typeof d[a] && b && d[a].apply(this, c);
          };
        f('onChange', !0 === m, h);
        f('onKeyPress', !0 === m, h);
        f('onComplete', g.length === e.length, h);
        f('onInvalid', 0 < c.invalid.length, [g, b, a, c.invalid, d]);
      },
    };
    a = b(a);
    var g = this,
      n = c.val(),
      p;
    e = 'function' === typeof e ? e(c.val(), void 0, a, d) : e;
    g.mask = e;
    g.options = d;
    g.remove = function () {
      var b = c.getCaret();
      c.destroyEvents();
      c.val(g.getCleanVal());
      c.setCaret(b - c.getMCharsBeforeCount(b));
      return a;
    };
    g.getCleanVal = function () {
      return c.getMasked(!0);
    };
    g.getMaskedVal = function (a) {
      return c.getMasked(!1, a);
    };
    g.init = function (e) {
      e = e || !1;
      d = d || {};
      g.clearIfNotMatch = b.jMaskGlobals.clearIfNotMatch;
      g.byPassKeys = b.jMaskGlobals.byPassKeys;
      g.translation = b.extend({}, b.jMaskGlobals.translation, d.translation);
      g = b.extend(!0, {}, g, d);
      p = c.getRegexMask();
      !1 === e
        ? (d.placeholder && a.attr('placeholder', d.placeholder),
          a.data('mask') && a.attr('autocomplete', 'off'),
          c.destroyEvents(),
          c.events(),
          (e = c.getCaret()),
          c.val(c.getMasked()),
          c.setCaret(e + c.getMCharsBeforeCount(e, !0)))
        : (c.events(), c.val(c.getMasked()));
    };
    g.init(!a.is('input'));
  };
  b.maskWatchers = {};
  var A = function () {
      var a = b(this),
        e = {},
        d = a.attr('data-mask');
      a.attr('data-mask-reverse') && (e.reverse = !0);
      a.attr('data-mask-clearifnotmatch') && (e.clearIfNotMatch = !0);
      'true' === a.attr('data-mask-selectonfocus') && (e.selectOnFocus = !0);
      if (z(a, d, e)) return a.data('mask', new y(this, d, e));
    },
    z = function (a, e, d) {
      d = d || {};
      var c = b(a).data('mask'),
        g = JSON.stringify;
      a = b(a).val() || b(a).text();
      try {
        return (
          'function' === typeof e && (e = e(a)),
          'object' !== typeof c || g(c.options) !== g(d) || c.mask !== e
        );
      } catch (n) {}
    };
  b.fn.mask = function (a, e) {
    e = e || {};
    var d = this.selector,
      c = b.jMaskGlobals,
      g = c.watchInterval,
      c = e.watchInputs || c.watchInputs,
      n = function () {
        if (z(this, a, e)) return b(this).data('mask', new y(this, a, e));
      };
    b(this).each(n);
    d &&
      '' !== d &&
      c &&
      (clearInterval(b.maskWatchers[d]),
      (b.maskWatchers[d] = setInterval(function () {
        b(document).find(d).each(n);
      }, g)));
    return this;
  };
  b.fn.masked = function (a) {
    return this.data('mask').getMaskedVal(a);
  };
  b.fn.unmask = function () {
    clearInterval(b.maskWatchers[this.selector]);
    delete b.maskWatchers[this.selector];
    return this.each(function () {
      var a = b(this).data('mask');
      a && a.remove().removeData('mask');
    });
  };
  b.fn.cleanVal = function () {
    return this.data('mask').getCleanVal();
  };
  b.applyDataMask = function (a) {
    a = a || b.jMaskGlobals.maskElements;
    (a instanceof b ? a : b(a)).filter(b.jMaskGlobals.dataMaskAttr).each(A);
  };
  var p = {
    maskElements: 'input,td,span,div',
    dataMaskAttr: '*[data-mask]',
    dataMask: !0,
    watchInterval: 300,
    watchInputs: !0,
    useInput: (function (a) {
      var b = document.createElement('div'),
        d;
      a = 'on' + a;
      d = a in b;
      d || (b.setAttribute(a, 'return;'), (d = 'function' === typeof b[a]));
      return d;
    })('input'),
    watchDataMask: !1,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
      0: { pattern: /\d/ },
      9: { pattern: /\d/, optional: !0 },
      '#': { pattern: /\d/, recursive: !0 },
      A: { pattern: /[a-zA-Z0-9]/ },
      S: { pattern: /[a-zA-Z]/ },
    },
  };
  b.jMaskGlobals = b.jMaskGlobals || {};
  p = b.jMaskGlobals = b.extend(!0, {}, p, b.jMaskGlobals);
  p.dataMask && b.applyDataMask();
  setInterval(function () {
    b.jMaskGlobals.watchDataMask && b.applyDataMask();
  }, p.watchInterval);
});

(function (o) {
  var t = {
    url: !1,
    callback: !1,
    target: !1,
    duration: 120,
    on: 'mouseover',
    touch: !0,
    onZoomIn: !1,
    onZoomOut: !1,
    magnify: 1,
  };
  (o.zoom = function (t, n, e, i) {
    var u,
      c,
      a,
      r,
      m,
      l,
      s,
      f = o(t),
      h = f.css('position'),
      d = o(n);
    return (
      (t.style.position = /(absolute|fixed)/.test(h) ? h : 'relative'),
      (t.style.overflow = 'hidden'),
      (e.style.width = e.style.height = ''),
      o(e)
        .addClass('zoomImg')
        .css({
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          width: e.width * i,
          height: e.height * i,
          border: 'none',
          maxWidth: 'none',
          maxHeight: 'none',
        })
        .appendTo(t),
      {
        init: function () {
          (c = f.outerWidth()),
            (u = f.outerHeight()),
            n === t
              ? ((r = c), (a = u))
              : ((r = d.outerWidth()), (a = d.outerHeight())),
            (m = (e.width - c) / r),
            (l = (e.height - u) / a),
            (s = d.offset());
        },
        move: function (o) {
          var t = o.pageX - s.left,
            n = o.pageY - s.top;
          (n = Math.max(Math.min(n, a), 0)),
            (t = Math.max(Math.min(t, r), 0)),
            (e.style.left = t * -m + 'px'),
            (e.style.top = n * -l + 'px');
        },
      }
    );
  }),
    (o.fn.zoom = function (n) {
      return this.each(function () {
        var e = o.extend({}, t, n || {}),
          i = (e.target && o(e.target)[0]) || this,
          u = this,
          c = o(u),
          a = document.createElement('img'),
          r = o(a),
          m = 'mousemove.zoom',
          l = !1,
          s = !1;
        if (!e.url) {
          var f = u.querySelector('img');
          if (
            (f && (e.url = f.getAttribute('data-src') || f.currentSrc || f.src),
            !e.url)
          )
            return;
        }
        c.one(
          'zoom.destroy',
          function (o, t) {
            c.off('.zoom'),
              (i.style.position = o),
              (i.style.overflow = t),
              (a.onload = null),
              r.remove();
          }.bind(this, i.style.position, i.style.overflow),
        ),
          (a.onload = function () {
            function t(t) {
              f.init(),
                f.move(t),
                r
                  .stop()
                  .fadeTo(
                    o.support.opacity ? e.duration : 0,
                    1,
                    o.isFunction(e.onZoomIn) ? e.onZoomIn.call(a) : !1,
                  );
            }
            function n() {
              r.stop().fadeTo(
                e.duration,
                0,
                o.isFunction(e.onZoomOut) ? e.onZoomOut.call(a) : !1,
              );
            }
            var f = o.zoom(i, u, a, e.magnify);
            'grab' === e.on
              ? c.on('mousedown.zoom', function (e) {
                  1 === e.which &&
                    (o(document).one('mouseup.zoom', function () {
                      n(), o(document).off(m, f.move);
                    }),
                    t(e),
                    o(document).on(m, f.move),
                    e.preventDefault());
                })
              : 'click' === e.on
              ? c.on('click.zoom', function (e) {
                  return l
                    ? void 0
                    : ((l = !0),
                      t(e),
                      o(document).on(m, f.move),
                      o(document).one('click.zoom', function () {
                        n(), (l = !1), o(document).off(m, f.move);
                      }),
                      !1);
                })
              : 'toggle' === e.on
              ? c.on('click.zoom', function (o) {
                  l ? n() : t(o), (l = !l);
                })
              : 'mouseover' === e.on &&
                (f.init(),
                c
                  .on('mouseenter.zoom', t)
                  .on('mouseleave.zoom', n)
                  .on(m, f.move)),
              e.touch &&
                c
                  .on('touchstart.zoom', function (o) {
                    o.preventDefault(),
                      s
                        ? ((s = !1), n())
                        : ((s = !0),
                          t(
                            o.originalEvent.touches[0] ||
                              o.originalEvent.changedTouches[0],
                          ));
                  })
                  .on('touchmove.zoom', function (o) {
                    o.preventDefault(),
                      f.move(
                        o.originalEvent.touches[0] ||
                          o.originalEvent.changedTouches[0],
                      );
                  })
                  .on('touchend.zoom', function (o) {
                    o.preventDefault(), s && ((s = !1), n());
                  }),
              o.isFunction(e.callback) && e.callback.call(a);
          }),
          (a.src = e.url);
      });
    }),
    (o.fn.zoom.defaults = t);
})(window.jQuery);
('use strict');

/* toggle search menu mobile */
$(document)
  .on('click', '.search-mobile-click', toggleId)
  .on('click', '#burgue-menu-mobile-click', toggleId)
  .on('click', '#fechar-toggle-menu', toggleId)
  .on('click', '.submenu-mobile', toggleId)
  .on('click', '.assita-o-video-mobile', toggle)
  .on('click', '#btn-avaliacao', toggle);
$(function () {
  $('#burgue-menu-mobile-click').on('click', function () {
    $('body, html').css('overflow', 'hidden');
    $('toggle-menu').css('height', '100vh');
    $('toggle-menu').css('width', '100%');
    $('toggle-menu').css('border-radius', '100%');
    var timeoutshow = 0;
    $('.toggle-menu-linhas li').each(function (linha) {
      timeoutshow = timeoutshow + 10;
      $(this).fadeIn(timeoutshow);
    });
    timeoutshow = 0;
  });
  $('#fechar-toggle-menu').on('click', function () {
    $('body, html').css('overflow', 'initial');
    $('toggle-menu').css('height', '0');
    $('toggle-menu').css('width', '0%');
    $('toggle-menu').css('border-radius', '0%');
    $('.toggle-menu-linhas li').each(function (linha) {
      $(this).fadeOut();
    });
  });
  $('.submenu-mobile').on('click', function () {
    $(this).toggleClass('active');
  });
  $('.minha-conta.logado').on('click', function () {
    $(this).toggleClass('active');
    $('.user-details').toggleClass('active');
    $('.toggle-menu .topo-menu').toggleClass('active');
  });
});

/* Toggle GenÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©rico */

function toggle() {
  id = $(this).attr('data-show');
  $(this).toggleClass('close-toggle');
  $('.' + id).toggle(100);

  if (id == 'form-avaliacao-produto' && $(this).hasClass('close-toggle')) {
    $(this).css('background', '#e3342f');
    $(this).val('- fechar avaliaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o');
  } else {
    $(this).css('background', '#4EAC00');
    $(this).val('+ avalie esse produto');
  }
}

function toggleId() {
  id = $(this).attr('data-show');
  $('#' + id).toggle(100);
}

function mudaCor(e) {
  window.location = e.options[e.selectedIndex].value;
}

$(document).ready(function () {
  /* Mask para cpf */
  function setmask_CPF(cpf) {
    if (cpf.val().replace('.', '').length == 11) {
      cpf.mask('000.000.000-00');
    } else if (cpf.val().replace('.', '').length == 14) {
      cpf.mask('00.000.000/0000-00');
    }
  }

  $('.cpf').keydown(function () {
    $(this).unmask();
  });
  $('.cpf').keyup(function () {
    setmask_CPF($(this));
  });
  $('.cpf').focusout(function () {
    setmask_CPF($(this));
  }); // $(".cpf").focusin(function(event) {
  //   $(".cpf").unmask();
  //   $(".cpf").mask('00000000000000');
  // });

  $('#cep').mask('00000-000');
});

function alert_modal(mensagem, tipo) {
  $('.alert-success-modal').css('display', 'none');
  $('.alert-error-modal').css('display', 'none');
  $('.alert-warning-modal').css('display', 'none');

  if (tipo == 1) {
    $('.alert-success-modal').css('display', 'block');
  } else if (tipo == 2) {
    $('.alert-error-modal').css('display', 'block');
  } else {
    $('.alert-warning-modal').css('display', 'block');
  }

  $('.mensagens-alert').html(mensagem);
  $('#modal-generico-alert').modal();
}
/* Ajax de newsletters */

$(document).ready(function () {
  $('#enviar-newsletters').on('click', function () {
    $.ajax({
      url: '/Cadastro/newsletters/',
      type: 'POST',
      data: $('#newsletters-footer').serialize(),
      beforeSend: function beforeSend() {
        console.log('Enviando..');
        $('.loading').css('display', 'block');
      },
    })
      .done(function (retorno) {
        console.log(retorno);

			insider_object_user = {};
			n = $('#nome-newsletters').val().split(' ');
			insider_object_user.name = n[0];
			if (n.length > 1) {
				insider_object_user.surname = n[1];
			}else{
				insider_object_user.surname = '';
			}
			
			insider_object_user.email = $('#email-newsletters').val();

			insider_object_user.gdpr_optin = true;
			insider_object_user.email_optin = true;
			insider_object_user.whatsapp_optin = true;
			
			window.insider_object = window.insider_object || {};
			window.insider_object.user = insider_object_user;
			Insider.eventManager.dispatch('init-manager:re-initialize');


        if (retorno == true) {
          alert_modal('Cadastro realizado com sucesso!', 1);		  
        } else if (retorno == 'E-mail jÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ cadastrado!') {
			alert_modal(retorno, 2);
        } else {
          alert_modal(retorno, 3);
        }

        $('.loading').css('display', 'none');
      })
      .fail(function (retorno) {
        console.log(retorno);
        alert_modal('Ooops! Ocorreu um erro', 2);
      })
      .always(function (retorno) {
        console.log('AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o completada.');
        $('#nome-newsletters').val('');
        $('#email-newsletters').val('');
      });
  });
});
/* Ajax de login */

$(document).ready(function () {
  $('#btn-entrar, .btn-forca-logar').on('click', function () {
    $('#modal-login .error_msg').hide();
    $('#modal-login').modal('show');
  });
  $('header .meuspedidos, .favoritos').on('click', function () {
    if ($(this).hasClass('deslogado')) {
      $('#modal-login .error_msg').hide();
      $('#modal-login').modal('show');
    } else {
      $(this).find('.login--link').attr('href', '/pedidos');
      console.log($(this).find('--link'));
    }
  });
  $('.btn-cadastrar').on('click', function () {
    $('#modal-login').modal('hide');
    $('#modal-cadastrar').modal('show');
  });
  $('#btn-voltar-login').on('click', function () {
    $('#modal-cadastrar').modal('hide');
    $('#modal-login').modal('show');
  }); //Realiza envio do form login

  $('#email-login').change(function () {
    if ($('#email-login').is(':visible')) {
      $('.recuperaSenha').attr('href','/cadastro/RecuperSenha/' + btoa($('#email-login').val()));
    }else {
      console.log('modal escondido');
    }
  });

  $('.recuperaSenha').click(function() {
    if ($('#email-login').val() !== '') {
      $('.email-login').html('');
      $('#email-login').css({'border': '1px solid #c2c5c7'});
      document.location = '/cadastro/RecuperSenha/' + btoa($('#email-login').val());
    }else {
      $('.email-login').html('Digite o seu email para recuperar a senha.').css({'color':'#F00'});
      $('#email-login').css({'border': '1px solid red'});
    }
  });

  $('#botao-login').on('click', function () {
    login();
  });
  $('#loginzin input').keydown(function (event) {
    if (event.which == 13) {
      login();
    }
  });






  function login() {
    if ($('#email-login').val() == '') {
        $('.email-login').html('Digite um e-mail valido.').css({'color':'#F00'});
        $('#email-login').css({'border': '1px solid red'});
        return false;
    }else {
        $('.email-login').html('');
        $('#email-login').css({'border': '1px solid #c2c5c7'});
    }

    if ($('#senha').val() == '') {
        $('.help-blockcpf-login').html('Digite a senha.').css({'color':'#F00'});
        $('#senha').css({'border': '1px solid red'});

        return false;
    }else {
        $('.help-blockcpf-login').html('');
        $('#cpf').css({'border': '1px solid #c2c5c7'});
    }


    $.ajax({
      url: '/Login/logar/',
      type: 'POST',
      data: $('#loginzin').serialize(),
      beforeSend: function beforeSend() {
        console.log('Enviando..');
        $('.loading').show();
      },
    }).done(function (retorno) {
        console.log(retorno);

        if (retorno == true) {
          location.reload();
        } else {

          if (typeof retorno === 'object') {
            if (retorno.hasOwnProperty('erro')) {
              $('.help-blockcpf-login').html(retorno.erro).css({'color':'#FF5252'});;
              $('#email-login').css({'border': '1px solid #FF5252'});
              $('#senha').css({'border': '1px solid red'});

            }else {
              $('.help-blockcpf-login').html("Login invalido").css({'color':'#FF5252'});;
              $('#email-login').css({'border': '1px solid #FF5252'});
              $('#senha').css({'border': '1px solid red'});
            }
          }else{
			  $('.help-blockcpf-login').html("Login invalido").css({'color':'#FF5252'});;
              $('#email-login').css({'border': '1px solid #FF5252'});
              $('#senha').css({'border': '1px solid red'});
		  }


        }

        $('.loading').hide();
      }).fail(function (retorno) {
        console.log(retorno);
        $('#modal-login').modal('hide');
        alert_modal('Ooops! Ocorreu um erro', 2);
      }).always(function (retorno) {
        console.log('AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o completada.');
      });
  } //Realiza envio do form novo cadastro

  $('#botao-cadastrar').on('click', function () {
    $.ajax({
      url: '/Cadastro/cadastrar_novo',
      type: 'POST',
      data: $('#form-cadastrar').serialize(),
      beforeSend: function beforeSend() {
        console.log('Enviando..');
        $('.loading').show();
      },
    })
      .done(function (retorno) {
        console.log(retorno);

        if (retorno == true) {
          n = $('#nome-cadastro').val().split(' ');
          nome = n[0];
          if (n.length > 1) {
            sobrenome = n[1];
          }else{
            sobrenome = '';
          }

          window.insider_object = window.insider_object || {};
          window.insider_object.user = {
               "gdpr_optin":true,
               "name":nome,
               "surname":sobrenome,
               "email": $('#email-cadastro').val(),
               "email_optin":true,
               "phone_number":"+55" + $('#telefone-cadastro').val().replace('(','').replace(')','').replace('-','').replace(' ',''),
               "whatsapp_optin":true
          };
		  Insider.eventManager.dispatch('init-manager:re-initialize');

          location.reload();
        } else {
          $('#erro-cadastro').html(retorno);
          $('.email-cadastro').html('');
          $('.cpf-cadastro').html('');
          $('.nome-cadastro').html('');
          $('.telefone-cadastro').html(''); //validando form cadastro

          if ($('#email-cadastro').val().length < 5) {
            $('#email-cadastro').css('border', '1px solid red');
            $('.email-cadastro').html('Digite um e-mail valido.');
          }

          if ($('#cpf-cadastro').val().length < 11) {
            $('#cpf-cadastro').css('border', '1px solid red');
            $('.cpf-cadastro').html('Digite um cpf/cnpj valido.');
          }

          if ($('#nome-cadastro').val().length < 4) {
            $('#nome-cadastro').css('border', '1px solid red');
            $('.nome-cadastro').html('Digite um nome valido.');
          }

          if ($('#telefone-cadastro').val().length < 8) {
            $('#telefone-cadastro').css('border', '1px solid red');
            $('.telefone-cadastro').html('Digite um telefone valido.');
          }
        }

        $('.loading').hide();
      })
      .fail(function (retorno) {
        console.log(retorno);
        $('#modal-login').modal('hide');
        alert_modal('Ooops! Ocorreu um erro', 2);
      })
      .always(function (retorno) {
        console.log('AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o completada.');
      });
  });
});
/* Login Google Api */

var clicked = false; //Global Variable

function ClickLogin() {
  clicked = true;
}

function onSignIn(googleUser) {
  if (clicked) {
    var dados = googleUser.getBasicProfile();
    $.ajax({
      url: '/Login/autenticarGoogle/',
      type: 'POST',
      data: dados,
      beforeSend: function beforeSend() {
        console.log('Enviando..');
        $('.loading').show();
      },
    })
      .done(function (retorno) {
        console.log(retorno);

        if (retorno == true) {
          location.reload();
        } else {
          alert_modal('Acesso negado!<br> Conta nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o encontrada.', 3);
        }

        $('.loading').hide();
      })
      .fail(function (retorno) {
        console.log(retorno);
        alert_modal('Ooops! Ocorreu um erro', 2);
      })
      .always(function (retorno) {
        console.log('AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o completada.');
      });
  }
}
/* Ajax de login */

$(document).ready(function () {
  var typingTimer; //timer identifier
  //on keyup, start the countdown

  $('#search-deck').on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, 300);
  }); //on keydown, clear the countdown

  $('#search-deck').on('keydown', function () {
    clearTimeout(typingTimer);
  }); //user is "finished typing," do something

  function doneTyping() {
    var html = '';
    $('.pre-view').html('');
    var valor = $('#search-deck').val(); //verifica se tem no minimo 2 caracteres no campo de pesquisa

    if (valor.length >= 1) {
      //mostra feed de resultado da pesquisa
      $('.pre-view').show();
      $('#search-deck').css('border-radius', '25px 25px 0px 0px');
      $.ajax({
        url: '/pesquisa/buscaRapida?t=' + valor,
        type: 'GET',
        data: $('#search-deck').serialize(),
        beforeSend: function beforeSend() {
          console.log('Enviando..');
        },
      })
        .done(function (retorno) {
          if (
            retorno.resultprod.length != 0 &&
            retorno.resultprod.length != 'undefined' &&
            retorno.resultprod.length != null
          ) {
            html +=
              '<p class="pre-view_more-results"><a href="/pesquisa/busca/?q=' +
              valor +
              '">Pesquisar <b>' +
              valor +
              '</b> em todo o site</a></p>';
            html += '<div class="pre-view-resultado">';
            html += '<p><b>Sugest&atilde;o(&otilde;es) para voc&ecirc;</b></p>';
            $.each(retorno.resultprod, function (i, produto) {
              html += '<figure>';
              html +=
                '<a href="/' +
                produto.familia_canonical +
                '/' +
                produto.linha_canonical +
                '/' +
                produto.url +
                '.htm"><img src="https://www.girafa.com.br/visao/default/img/produtos/' +
                produto.imagem1.slice(0, -4) +
                '-comparativo.jpg"></a>';
              html += '<figcaption>';
              html +=
                '<a href="/' +
                produto.familia_canonical +
                '/' +
                produto.linha_canonical +
                '/' +
                produto.url +
                '.htm">';
              html += produto.titulo;
              html += '</a>';
              html += '</figcaption>';
              html += '<figcaption>';
              html += 'R$ ' + parseFloat(produto.desconto).toFixed(2);
              html += '</figcaption>';
              html += '</figure>';
              $('.pre-view').html(html + '</div>');
            });
          }
        })
        .fail(function (retorno) {
          //console.log(retorno);
        })
        .always(function (retorno) {
          //console.log(retorno);
        });
    } else {
      $('.pre-view').hide();
      $('#search-deck').css('border-radius', '25px');
    }
  }
});
$(document).ready(function () {
  $('#search-deck').on('focusout', function () {
    if (!$('.pre-view').is(':hover')) {
      $('.pre-view').hide();
      $('#search-deck').css('border-radius', '25px');
    }
  });
});
$('.search-deck .btn-find').click(function (event) {
  $(this).parent().submit();
});
/* Login Google Api */

function calcularCep() {
  $('.loader').show();
  $.ajax({
    url: '/produto/calcularFrete/',
    type: 'POST',
    data: $('#calcular-o-cep').serialize(),
    beforeSend: function beforeSend() {
      $('.loader-cep').show();
    },
  })
    .done(function (retorno) {
      $('.result-cal-cep').html(retorno);
      console.log(retorno);
      if (retorno.indexOf('NatalComum') > -1) {
        $('.entrega-garantida-natal img').attr('src','https://www.girafa.com.br/visao/default/img/selos_natal/chega_antes_natal.png');
      }else if (retorno.indexOf('NatalExpresso') > -1) {
        $('.entrega-garantida-natal img').attr('src','https://www.girafa.com.br/visao/default/img/selos_natal/chega_antes_natal_expresso.png');
      }else {
        $('.entrega-garantida-natal img').attr('src','https://www.girafa.com.br/visao/default/img/selos_natal/nao_chega_antes_natal.png');
      }
    })
    .fail(function (retorno) {
      console.log(retorno);
      alert_modal('Ooops! Ocorreu um erro', 2);
    })
    .always(function (retorno) {
      console.log('AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o completada.');
      $('.loader-cep').hide();
    });
}

$(document).ready(function () {
  $('#cep').keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == '13') {
      var cep = $('#cep').val();

      if (cep == '0' || cep == '' || cep == 'undefined' || cep == null) {
        alert_modal('Ooops! CEP inv&aacute;lido', 2);
      } else {
        calcularCep();
      }
    }
  });
  $('#btn-ok').on('click', function () {
    var cep = $('#cep').val();

    if (cep == '0' || cep == '' || cep == 'undefined' || cep == null) {
      alert_modal('Ooops! CEP inv&aacute;lido', 2);
    } else {
      calcularCep();
    }
  });
  $('#calcular-o-cep').on('submit', function (e) {
    e.preventDefault();
  });
}); // Zoom e changeClick produto

$(document).ready(function () {
  $('.fotos-miniaturas img').first().addClass('active');
  $('.fotos img').on('click', function () {
    var img_grande = $(this).attr('data-large');
    $('.img-foco img').attr('src', img_grande);
    $('.fotos-miniaturas img').removeClass('active');
    $(this).addClass('active');
  });
  $('#zoom-foto').mouseenter(function () {
    $(this).zoom();
  });
}); // $(function(){
//   if(screen.width <= 768){
//   var e = $(".fotos-miniaturas");
//   // move up:
//   e.next().insertBefore(e);
//   }
//   $( window ).resize(function() {
//     if(screen.width <= 768){
//     var e = $(".fotos-miniaturas");
//     // move up:
//     e.next().insertBefore(e);
//     }
//   });
// });

$(document).ready(function () {
  $('#submit_form').on('click', function () {
    console.log($('#form-avaliacao-produto-block-submit').serialize());
    $.ajax({
      url: '/produto/review/',
      type: 'POST',
      data: $('#form-avaliacao-produto-block-submit').serialize(),
      beforeSend: function beforeSend() {
        console.log('Enviando..');
        $('.loading').show();
      },
    })
      .done(function (retorno) {
        console.log(retorno);

        if (retorno == 'Todos os campos sÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o obrigatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³rios!') {
          alert_modal(retorno, 3);
        } else if (retorno == 'Review enviado com sucesso!') {
          alert_modal(retorno, 1);
          $('#nome-avaliacao').val('');
          $('#email-avaliacao').val('');
          $('#text-area-avaliacao').val('');
        } else if (
          retorno ==
          'VocÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª jÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ fez uma avaliaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o parecida!'
        ) {
          alert_modal(retorno, 3);
        } else {
          alert_modal(retorno, 3);
        }

        $('.loading').hide();
      })
      .fail(function (retorno) {
        console.log(retorno);
        alert_modal('Ooops! Ocorreu um erro', 2);
      })
      .always(function (retorno) {
        console.log('AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o completada.');
        alert_modal(retorno, 1);
        $('#nome-avaliacao').val('');
        $('#email-avaliacao').val('');
        $('#text-area-avaliacao').val('');
      });
  });
});
$(document).on('ready', function () {
  $('.btn-compare').on('click', function () {
    $(this).toggleClass('classToggleOpacity');
  });
});
/*funcionalidade para inclusÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o de produtos no box de comparaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o*/

$(document).on('click', '.btncompara', function (e) {
  e.preventDefault();
  idProduto = $(this).attr('data-id');
  selected = $(this).attr('data-selected');
  img = $('.img' + idProduto).clone();
  console.log(idProduto); //adiciona classe de botÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o ativo

  $(this).addClass('active');
  /*se foi checado, verifica qual div esta vazia e adiciona a imagem com as propriedades*/

  if (selected == 0) {
    /*Verifica se todos os itens estÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o selecionados e retorna msg*/
    if (
      $('#comparaProd1').attr('data-produto') != '' &&
      $('#comparaProd2').attr('data-produto') != '' &&
      $('#comparaProd3').attr('data-produto') != '' &&
      $('#comparaProd4').attr('data-produto') != ''
    ) {
      alert_modal(
        'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â° permitido no mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ximo 4 produtos para comparaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o, vocÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª jÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ selecionou todos.',
        3,
      );
      $(this).prop('checked', false);
      $(this).attr('data-selected', 0);
      $(this).removeClass('active');
    }

    if ($('#comparaProd1').html() == '') {
      $('#comparaProd1').html(img);
      $('#comparaProd1').attr('data-produto', idProduto);
    } else if ($('#comparaProd2').html() == '') {
      $('#comparaProd2').html(img);
      $('#comparaProd2').attr('data-produto', idProduto);
    } else if ($('#comparaProd3').html() == '') {
      $('#comparaProd3').html(img);
      $('#comparaProd3').attr('data-produto', idProduto);
    } else if ($('#comparaProd4').html() == '') {
      $('#comparaProd4').html(img);
      $('#comparaProd4').attr('data-produto', idProduto);
    }

    $(this).attr('data-selected', 1);
  } else {
    /*se o checkbox foi desmarcado, procura pelo id em todas as divs e retira a imagem e sua popriedades da div*/
    for (i = 1; i <= 4; i++) {
      if ($('#comparaProd' + i).attr('data-produto') == idProduto) {
        $('#comparaProd' + i).attr('data-produto', '');
        $('#box-compare .img' + idProduto).remove();
      }
    }

    $(this).attr('data-selected', 0); //adiciona classe de botÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o ativo

    $(this).removeClass('active');
  }
});
/*pega os ids dos itens selecionados e redireciona para a pagina de comparaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o*/

$(document).on('click', '#btnCompare', function () {
  url = '/produto/comparativo/';
  countItens = 0;

  for (i = 1; i <= 4; i++) {
    if ($('#comparaProd' + i).attr('data-produto') != '') {
      url += $('#comparaProd' + i).attr('data-produto') + '/';
      countItens++;
    }
  }

  if (countItens < 2) {
    alert_modal(
      'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â° necessÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡rio selecionar no minimo 2 produtos para comparar.',
      3,
    );
  } else {
    //console.log(url);
    window.location.href = url;
  }
}); // $("#clickVerMais").click(function() {
//   console.log($("#DescicaoAncora").offset().top);
//   $('html, body').animate({
//       scrollTop: $("#DescicaoAncora").offset().top - 80
//   }, 1000);
// });

$(document).scroll(function () {
  $('#produtofixed').toggle($(this).scrollTop() > 500);
});
$(document).on('change', '#itensPagina', function () {
  limite = $(this).val();
  filtro = $(this).attr('data-filtro');
  window.location = '?max=' + limite + '&page=1' + filtro;
});
/*$(document).on('change', '#ordem', function () {
  url = $(this).val();
  window.location = url;
});*/
/* Ajax de favoritos ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ */

$(document).on('click', '.favoritar', function (e) {
  e.preventDefault();
  idzinho = $(this).attr('data-id');
  clientezinho = $(this).attr('data-cliente');
    wishtagmanager = $(this).attr('data-wishtagmanager');
  obj = $(this);

  if (clientezinho != 'deslogado') {
    var json = {
      idzinho: idzinho,
      clientezinho: clientezinho,
    };
    console.log(json);
    $.ajax({
      url: '/produto/favoritar/',
      type: 'POST',
      data: json,
      beforeSend: function beforeSend() {
        console.log('Enviando..');
        $('.loading').show();
      },
    })
      .done(function (retorno) {
        console.log(retorno);
        $('.loading').hide();

        if (retorno == true) {
			if (!obj.hasClass('ativo')) {
              if (typeof wishtagmanager !== 'undefined') {
                dataLayer.push(JSON.parse(wishtagmanager));
                console.log(JSON.parse(wishtagmanager));
              }
            }

          $('#toggle_' + idzinho).toggleClass('ativo');
          $('#mobile_toggle_' + idzinho).toggleClass('ativo');
        }
      })
      .fail(function (retorno) {
        console.log(retorno);
        alert_modal('Ooops! Ocorreu um erro', 2);
      })
      .always(function (retorno) {
        console.log('AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o completada.');
      });
  } else {
    $('#modal-login .error_msg').show();
    $('#modal-login').modal('show');
  }
});
$(document).ready(function () {
  var timer = setInterval(function () {
    var get_height = $('#get_height').height();

    if (get_height > 0) {
      $('.oferta-do-dia').css('height', get_height + 'px');
      clearInterval(timer);
    }
  }, 1000);
}); // $(document).on("ready",function(){
//     var body = $('body').height();
//       $('.toggle-menu').css('height', body + 'px');
// });

$(window).resize(function () {
  var get_height = $('#get_height').height();
  $('.oferta-do-dia').css('height', get_height + 'px'); // var body = $('body').height();
  // $('.toggle-menu').css('height', body + 'px');
});

function abrirPopUP(url, largura, altura) {
  window.open(
    url,
    '_blank',
    'width=' +
      largura +
      ',height=' +
      altura +
      ',resizable=0,scrollbars=yes,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollable=1',
  );
} //ativa e desativa side bar mobile

$(document).ready(function () {
  $('#btn-filtrar').click(function () {
    $('.box-sidebar').css({
      left: '0px',
    });
  });
  $('#btn-fechar-filtros').click(function () {
    $('.box-sidebar').css({
      left: '-800px',
    });
  });
});

function goTo(url) {
  var a = document.createElement('a');

  if (!a.click) {
    //for IE
    window.location = url;
    return;
  }

  a.setAttribute('href', url);
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
}

function getQueryStringValue(key) {
  return unescape(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          escape(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i',
      ),
      '$1',
    ),
  );
}

$(document).ready(function () {
  /* var utm_source = getQueryStringValue("utm_source");

  if (utm_source == "dotz") {
    alert_modal("Agora vocÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª ganha dotz ao comprar no Girafa! Ganhe DZ 2 a cada R$ 1 gasto em nosso site. Aproveite!", 1);
  }*/
});
$(function () {
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isIE =
    /*@cc_on!@*/
    false || !!document.documentMode;

  if (isFirefox == true || isIE == true) {
    console.log('Clamp for Old Browsers Active');

    (function () {
      window.$clamp = function (c, d) {
        function s(a, b) {
          n.getComputedStyle ||
            (n.getComputedStyle = function (a, b) {
              this.el = a;

              this.getPropertyValue = function (b) {
                var c = /(\-([a-z]){1})/g;
                'float' == b && (b = 'styleFloat');
                c.test(b) &&
                  (b = b.replace(c, function (a, b, c) {
                    return c.toUpperCase();
                  }));
                return a.currentStyle && a.currentStyle[b]
                  ? a.currentStyle[b]
                  : null;
              };

              return this;
            });
          return n.getComputedStyle(a, null).getPropertyValue(b);
        }

        function t(a) {
          a = a || c.clientHeight;
          var b = u(c);
          return Math.max(Math.floor(a / b), 0);
        }

        function x(a) {
          return u(c) * a;
        }

        function u(a) {
          var b = s(a, 'line-height');
          'normal' == b && (b = 1.2 * parseInt(s(a, 'font-size')));
          return parseInt(b);
        }

        function l(a) {
          if (a.lastChild.children && 0 < a.lastChild.children.length)
            return l(Array.prototype.slice.call(a.children).pop());
          if (
            a.lastChild &&
            a.lastChild.nodeValue &&
            '' != a.lastChild.nodeValue &&
            a.lastChild.nodeValue != b.truncationChar
          )
            return a.lastChild;
          a.lastChild.parentNode.removeChild(a.lastChild);
          return l(c);
        }

        function p(a, d) {
          if (d) {
            var e = a.nodeValue.replace(b.truncationChar, '');
            f || ((h = 0 < k.length ? k.shift() : ''), (f = e.split(h)));
            1 < f.length ? ((q = f.pop()), r(a, f.join(h))) : (f = null);
            m &&
              ((a.nodeValue = a.nodeValue.replace(b.truncationChar, '')),
              (c.innerHTML =
                a.nodeValue + ' ' + m.innerHTML + b.truncationChar));

            if (f) {
              if (c.clientHeight <= d)
                if (0 <= k.length && '' != h)
                  r(a, f.join(h) + h + q), (f = null);
                else return c.innerHTML;
            } else
              '' == h &&
                (r(a, ''),
                (a = l(c)),
                (k = b.splitOnChars.slice(0)),
                (h = k[0]),
                (q = f = null));

            if (b.animate)
              setTimeout(
                function () {
                  p(a, d);
                },
                !0 === b.animate ? 10 : b.animate,
              );
            else return p(a, d);
          }
        }

        function r(a, c) {
          a.nodeValue = c + b.truncationChar;
        }

        d = d || {};
        var n = window,
          b = {
            clamp: d.clamp || 2,
            useNativeClamp:
              'undefined' != typeof d.useNativeClamp ? d.useNativeClamp : !0,
            splitOnChars: d.splitOnChars || ['.', '-', '\u2013', '\u2014', ' '],
            animate: d.animate || !1,
            truncationChar: d.truncationChar || '\u2026',
            truncationHTML: d.truncationHTML,
          },
          e = c.style,
          y = c.innerHTML,
          z = 'undefined' != typeof c.style.webkitLineClamp,
          g = b.clamp,
          v = g.indexOf && (-1 < g.indexOf('px') || -1 < g.indexOf('em')),
          m;
        b.truncationHTML &&
          ((m = document.createElement('span')),
          (m.innerHTML = b.truncationHTML));
        var k = b.splitOnChars.slice(0),
          h = k[0],
          f,
          q;
        'auto' == g ? (g = t()) : v && (g = t(parseInt(g)));
        var w;
        z && b.useNativeClamp
          ? ((e.overflow = 'hidden'),
            (e.textOverflow = 'ellipsis'),
            (e.webkitBoxOrient = 'vertical'),
            (e.display = '-webkit-box'),
            (e.webkitLineClamp = g),
            v && (e.height = b.clamp + 'px'))
          : ((e = x(g)), e <= c.clientHeight && (w = p(l(c), e)));
        return {
          original: y,
          clamped: w,
        };
      };
    })();

    $(document).ready(function () {
      var clamps = document.querySelectorAll(
        '.card-generico .titulo-produto a',
      );
      clamps.forEach(function (clamp) {
        $clamp(clamp, {
          clamp: 2,
        });
      });
      clamps = document.querySelectorAll('.avaliacoes_gerais .item blockquote');
      clamps.forEach(function (clamp) {
        $clamp(clamp, {
          clamp: 3,
        });
      });
    });
  }
});
//------------- CONVERT IMGS TO WEBP

$(function () {
  var supportsWebP = false;

  if (navigator.userAgent.indexOf('Chrome') != -1) {
    supportsWebP = true;
  } else {
    supportsWebP = false;
  }

  var allImages = document.body.getElementsByClassName('imgwebp');
  var length = allImages.length;

  for (var i = 0; i < length; i++) {
    var image = allImages[i];
    var jpgSource = image.dataset.img;

    if (window.innerWidth < 540 && $(image).hasClass('containsmobile')) {
      jpgSource = jpgSource.slice(0, -4) + '_m.jpg';
    }

    image.dataset.img = supportsWebP
      ? jpgSource.replace('.jpg', '.webp')
      : jpgSource;
  }
}); //------------- VIEWPORT ELEMENT

var isInViewport = function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}; //------------- ADD IMG SRC

function loadImg() {
  var imginview = getAllElementsWithAttribute('data-img');
  imginview.forEach(function (img) {
    if (isInViewport(img)) {
      // if(img.src == ""){
      img.src = img.dataset.img; // }
    }
  });
}

window.onmousemove = function () {
  loadImg();
};


window.onload = function() {
  loadImg();
};

// desce menu - mobile
document.addEventListener('DOMContentLoaded', function () {
  var prevScrollpos = window.pageYOffset;


  window.onload = function () {
    loadImg();
  };

  window.onscroll = function () {
    loadImg(); // if(!isInViewport(document.querySelector(".header-mobile")) && !document.querySelector(".produto-article")){
    //     document.querySelector(".search-mobile").classList.add("fixed-search");
    // }else{
    //   document.querySelector(".search-mobile").classList.remove("fixed-search");
    // }
  };

  loadImg();
});

function getAllElementsWithAttribute(attribute) {
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');

  for (var i = 0, n = allElements.length; i < n; i++) {
    if (allElements[i].getAttribute(attribute) !== null) {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }

  return matchingElements;
} //------------------ SCROLL TO PAGE ELEMENT

function scrollIt(destination) {
  var duration =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var easing =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : 'linear';
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  var easings = {
    linear: function linear(t) {
      return t;
    },
    easeInQuad: function easeInQuad(t) {
      return t * t;
    },
    easeOutQuad: function easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad: function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic: function easeOutCubic(t) {
      return --t * t * t + 1;
    },
    easeInOutCubic: function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart: function easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart: function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint: function easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint: function easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint: function easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
  };
  var start = window.pageYOffset;
  var startTime =
    'now' in window.performance ? performance.now() : new Date().getTime();
  var documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
  var windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight;
  var destinationOffset =
    typeof destination === 'number' ? destination : destination.offsetTop - 80;
  var destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset,
  );

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);

    if (callback) {
      callback();
    }

    return;
  }

  function scroll() {
    var now =
      'now' in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, (now - startTime) / duration);
    var timeFunction = easings[easing](time);
    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start),
    );

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }

      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

var el = document.querySelector('.go--to_description');

if (el) {
  el.addEventListener('click', function () {
    scrollIt(
      // this.getAttribute("class"),
      document.querySelector('#descricaocompleta'),
      500,
      'easeOutQuad',
    );
  });
}

el = document.querySelector('.go--to_avaliacoes');

if (el) {
  el.addEventListener('click', function () {
    scrollIt(document.querySelector('#avaliacoes'), 500, 'easeOutQuad');
  });
} // document.querySelector(".avaliacao--open_modal").addEventListener("click", function(el){
//   console.log(el);
// });

$(function () {
  var itemAvaliacao = '';
  $('.avaliacoes_gerais .item').on('click', function () {
    itemAvaliacao = $(this);
    $('html').css('overflow', 'hidden');
    $(this).addClass('fadeOut');
    $(this).find('.estrelas-avaliacao').addClass('fadeOutUp');
    $(this).find('.nome-cliente-avaliacao').addClass('fadeOutUp');
    $(this).find('.data-avaliacao').addClass('fadeOutUp');
    $(this).find('.texto').addClass('fadeOutUp');
    $('.avaliacao_modal .estrelas--avaliacao-modal').html(
      $(this).find('.estrelas-avaliacao').html(),
    );
    $('.avaliacao_modal .modal_nome-cliente-avaliacao').html(
      $(this).find('.nome-cliente-avaliacao').html(),
    );
    $('.avaliacao_modal .modal_data-avaliacao').html(
      $(this).find('.data-avaliacao').html(),
    );
    $('.avaliacao_modal .modal_texto').html($(this).find('.texto').html());
    setTimeout(function () {
      $('.avaliacao_modal_container').addClass('fadeIn').removeClass('fadeOut');
      $('.avaliacao_modal_container').css('display', 'flex');
      $('.avaliacao_modal_container .estrelas--avaliacao-modal')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp');
      $('.avaliacao_modal_container .modal_nome-cliente-avaliacao')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp');
      $('.avaliacao_modal_container .modal_data-avaliacao')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp');
      $('.avaliacao_modal_container .modal_texto')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp');
    }, 1100);
  });
  $('.avaliacao_modal_container, .close-modal-avaliacao').on(
    'click',
    function () {
      $('html').css('overflow', 'initial');
      $('.avaliacao_modal_container').addClass('fadeOut').removeClass('fadeIn');
      $('.avaliacao_modal_container .estrelas--avaliacao-modal')
        .addClass('fadeOutUp')
        .removeClass('fadeInDown');
      $('.avaliacao_modal_container .modal_nome-cliente-avaliacao')
        .addClass('fadeOutUp')
        .removeClass('fadeInDown');
      $('.avaliacao_modal_container .modal_data-avaliacao')
        .addClass('fadeOutUp')
        .removeClass('fadeInDown');
      $('.avaliacao_modal_container .modal_texto')
        .addClass('fadeOutUp')
        .removeClass('fadeInDown');
      setTimeout(function () {
        $('.avaliacao_modal_container').css('display', 'none');
      }, 500);
      $(itemAvaliacao).addClass('fadeIn').removeClass('fadeOut');
      $(itemAvaliacao)
        .find('.estrelas-avaliacao')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp');
      $(itemAvaliacao)
        .find('.nome-cliente-avaliacao')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp');
      $(itemAvaliacao)
        .find('.data-avaliacao')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp');
      $(itemAvaliacao)
        .find('.texto')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp');
    },
  );
}); // MINHA CONTA

if (document.querySelector('.edit-close')) {
  var editclose = document.querySelectorAll('.edit-close');
  editclose.forEach(function (close) {
    close.addEventListener('click', function (e) {
      e.target.closest('.edit-close').style.display = 'none';
      e.target
        .closest('.cliente-info')
        .querySelector('.edit-open').style.display = 'block';
      e.target
        .closest('.cliente-info')
        .querySelectorAll('input')
        .forEach(function (input) {
          input.removeAttribute('disabled');
        });
    });
  });
}

if (document.querySelector('.edit-open')) {
  var editopen = document.querySelectorAll('.edit-open');
  editopen.forEach(function (open) {
    open.addEventListener('click', function (e) {
      e.target.closest('.edit-open').style.display = 'none';
      e.target
        .closest('.cliente-info')
        .querySelector('.edit-close').style.display = 'block';
      e.target
        .closest('.cliente-info')
        .querySelectorAll('input')
        .forEach(function (input) {
          input.setAttribute('disabled', 'true');
        });
    });
  });
}

function cronometro(countdown, dateini, dateend, show) {
  var countDownDate,
    dateinitial = new Date(dateini);
  var now = new Date().getTime(); // Set the date we're counting down to

  if (now < dateinitial.getTime()) {
    console.log('Cronometro comeÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§a: ' + dateinitial);
  } else {
    show == true ? $('.counter').css('display', 'initial') : '';

    if (countdown == 'before') {
      countDownDate = new Date(dateend).getTime();
    } else {
      countDownDate = new Date(dateend).getTime();
    } // Update the count down every 1 second

    var timerwindow;

    if (window.innerWidth <= 720) {
      timerwindow = 'timermobile';
      $('.mobile-card .banner-home:first a').append($('.mobile-card .counter'));
    } else {
      timerwindow = 'timerdesk';
    }

    var x = setInterval(function () {
      // Get todays date and time
      now = new Date().getTime(); // Find the distance between now and the count down date

      var distance = countDownDate - now;
      var distanceinitial = countDownDate - dateinitial.getTime(); // Time calculations for days, hours, minutes and seconds

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000); // SET WIDTH OF BAR

      var hoursdiff = Math.floor(distance / 36e5);
      var width = (distance / 36e5 / (distanceinitial / 36e5)) * 100;
      document.querySelector('.counterbar_active').style.width = width + '%'; // Display the result in the element with id="demo"
      // document.getElementById("timer").innerHTML = '<span>' + days + '<p>dia</p></span><span>:</span><span>' + hours + '<p>horas</p></span><span>:</span><span>'

      if (countdown == 'before') {
        document.getElementById(timerwindow).innerHTML =
          '<span>' +
          hoursdiff +
          '<p>horas</p></span><span>:</span><span>' +
          minutes +
          '<p>minutos</p></span>';
      } else {
        document.getElementById(timerwindow).innerHTML =
          '<span>' +
          hoursdiff +
          '<p>horas</p></span><span>:</span><span>' +
          minutes +
          '<p>minutos</p></span><span>:</span><span>' +
          seconds +
          '<p>segundos</p></span>';
      } // If the count down is finished, write some text

      if (distance < 0) {
        clearInterval(x);
        document.getElementById(timerwindow).innerHTML = '00:00:00';
        $('.counter').css('display', 'none');
      } else if (distance > 0 && minutes == 0 && seconds < 2) {
        location.reload();
      }
    }, 1000);
  }
}

function LoadCategoria(categoria, prodids) {
  var ids = prodids;
  var desconto,
    foto,
    nome,
    depor,
    preco,
    desc,
    parcelas,
    prazo = '';
  html = '';
  ids.forEach(function (id) {
    var getid = document.querySelector(
      ".card-generico .imagens .favoritar[data-id='" + id + "']",
    );

    if (getid != null || getid != undefined) {
      // desconto = getid.parentElement.querySelector(".desconto").innerHTML;
      foto = getid.parentElement.querySelector('.product-image img').src;
      nome = getid.parentElement.parentElement.querySelector(
        '.prod .titulo-produto .prod',
      ).innerHTML;
      var risk = getid.parentElement.parentElement.querySelector(
        '.product-info .precos .risk span',
      );
      depor = risk == null ? '' : risk.innerHTML;
      preco = getid.parentElement.parentElement.querySelector(
        '.product-info .precos .preco .font-700 .size',
      ).innerHTML;
      desc = getid.parentElement.parentElement.querySelector(
        '.product-info .precos .preco .laranja',
      ).innerHTML;
      parcelas = getid.parentElement.parentElement
        .querySelector('.product-info .precos .preco .parcelas')
        .innerHTML.replace('font-700', 'valor');
      prazo = getid.parentElement.parentElement.querySelector(
        '.product-info .precos .preco .parcelas',
      ).nextSibling.nextSibling.nextSibling.innerHTML;
      link = getid.parentElement.querySelector('.product-image a').href;
      html += '<div class="col-sm-4 col-xs-4 slider-item">';
      html += '<span class="promo-item large-promo normal-item">'; // html += '<span class="badge">' + desconto != null ? desconto : " v"  +'</span>';

      html +=
        '<a href="' +
        link +
        '" target="blank"><img src="' +
        foto +
        '" class="fotoproduto"></a>';
      html += '<p class="nome">' + nome + '</p>';
      html += '<span class="price">';
      html += '<small class="risk">' + depor + '</small>';
      html += '<p class="avista">';
      html +=
        '<span class="valor">R$' +
        preco +
        '<span> ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢  vista</span>' +
        '<span class="desc">' +
        desc +
        '</span>' +
        '</span>';
      html += '</p>';
      html += '<p class="parcelas">';
      html += parcelas.replace('font-700', 'valor');
      html += '</p>';
      html += '<p class="prazo">' + prazo + '</p>';
      html += '</span>';
      html += '<a href=' + link + ' class="btn btn-success btnmdc">CONFIRA</a>';
      html += '</span>';
      html += '</div>';
      desconto, foto, nome, depor, preco, desc, parcelas, (prazo = '');
    } else {
    } //   if(desconto != null || desconto != undefined){
    //     document.getElementById(id).querySelector(".icons-new-desconto").innerHTML = '<span class="desconto">'+ desconto.innerHTML + '</span>';
    //   }else{
    //     document.getElementById(id).querySelector(".icons-new-desconto").innerHTML = '';
    //   }
  });
  document.getElementById('grid' + categoria).innerHTML = html;
}

$(document).ready(function () {
  var day = new Date().getDate();

  if (document.querySelector('.counter')) {
    if (new Date('Jan 01, 2019 18:00:00').getTime() < new Date().getTime()) {
      $('.counter-set').html('ACABA EM');
    } else {
      $('.counter-set').html('COMEÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡A EM');
    }

    switch (day) {
      case 20:
        if (
          new Date().getTime() < new Date('Jan 21, 2019 09:00:00').getTime()
        ) {
          cronometro(
            'after',
            'Jan 21, 2019 00:00:00',
            'Jan 21, 2019 08:59:59',
            true,
          );
        } else {
          cronometro(
            'after',
            'Jan 21, 2019 09:00:00',
            'Jan 21, 2019 23:59:59',
            true,
          );
        }

      default: // cronometro("after", "Jan 14, 2019 15:00:00", "Jan 15, 2019 17:00:00", false)
    }
  }
});

(function () {
  var a, b, c, d, e, f, g;
  (d = function (a, b) {
    var c, d, e, f;
    e = [];
    for (d in b.prototype)
      try {
        (f = b.prototype[d]),
          null == a[d] && 'function' != typeof f
            ? e.push((a[d] = f))
            : e.push(void 0);
      } catch (g) {
        c = g;
      }
    return e;
  }),
    (a = {}),
    null == a.options && (a.options = {}),
    (c = {
      checks: {
        xhr: {
          url: function () {
            return '/favicon.ico?_=' + Math.floor(1e9 * Math.random());
          },
          timeout: 5e3,
        },
        image: {
          url: function () {
            return '/favicon.ico?_=' + Math.floor(1e9 * Math.random());
          },
        },
        active: 'xhr',
      },
      checkOnLoad: !1,
      interceptRequests: !0,
      reconnect: !0,
    }),
    (e = function (a, b) {
      var c, d, e, f, g, h;
      for (
        c = a, h = b.split('.'), d = e = 0, f = h.length;
        f > e && ((g = h[d]), (c = c[g]), 'object' == typeof c);
        d = ++e
      );
      return d === h.length - 1 ? c : void 0;
    }),
    (a.getOption = function (b) {
      var d, f;
      return (
        (f = null != (d = e(a.options, b)) ? d : e(c, b)),
        'function' == typeof f ? f() : f
      );
    }),
    'function' == typeof window.addEventListener &&
      window.addEventListener(
        'online',
        function () {
          return setTimeout(a.confirmUp, 100);
        },
        !1,
      ),
    'function' == typeof window.addEventListener &&
      window.addEventListener(
        'offline',
        function () {
          return a.confirmDown();
        },
        !1,
      ),
    (a.state = 'up'),
    (a.markUp = function () {
      return (
        a.trigger('confirmed-up'),
        'up' !== a.state ? ((a.state = 'up'), a.trigger('up')) : void 0
      );
    }),
    (a.markDown = function () {
      return (
        a.trigger('confirmed-down'),
        'down' !== a.state ? ((a.state = 'down'), a.trigger('down')) : void 0
      );
    }),
    (f = {}),
    (a.on = function (b, c, d) {
      var e, g, h, i, j;
      if (((g = b.split(' ')), g.length > 1)) {
        for (j = [], h = 0, i = g.length; i > h; h++)
          (e = g[h]), j.push(a.on(e, c, d));
        return j;
      }
      return null == f[b] && (f[b] = []), f[b].push([d, c]);
    }),
    (a.off = function (a, b) {
      var c, d, e, g, h;
      if (null != f[a]) {
        if (b) {
          for (e = 0, h = []; e < f[a].length; )
            (g = f[a][e]),
              (d = g[0]),
              (c = g[1]),
              c === b ? h.push(f[a].splice(e, 1)) : h.push(e++);
          return h;
        }
        return (f[a] = []);
      }
    }),
    (a.trigger = function (a) {
      var b, c, d, e, g, h, i;
      if (null != f[a]) {
        for (g = f[a], i = [], d = 0, e = g.length; e > d; d++)
          (h = g[d]), (b = h[0]), (c = h[1]), i.push(c.call(b));
        return i;
      }
    }),
    (b = function (a, b, c) {
      var d, e, f, g, h;
      return (
        (h = function () {
          return a.status && a.status < 12e3 ? b() : c();
        }),
        null === a.onprogress
          ? ((d = a.onerror),
            (a.onerror = function () {
              return (
                c(), 'function' == typeof d ? d.apply(null, arguments) : void 0
              );
            }),
            (g = a.ontimeout),
            (a.ontimeout = function () {
              return (
                c(), 'function' == typeof g ? g.apply(null, arguments) : void 0
              );
            }),
            (e = a.onload),
            (a.onload = function () {
              return (
                h(), 'function' == typeof e ? e.apply(null, arguments) : void 0
              );
            }))
          : ((f = a.onreadystatechange),
            (a.onreadystatechange = function () {
              return (
                4 === a.readyState ? h() : 0 === a.readyState && c(),
                'function' == typeof f ? f.apply(null, arguments) : void 0
              );
            }))
      );
    }),
    (a.checks = {}),
    (a.checks.xhr = function () {
      var c, d;
      (d = new XMLHttpRequest()),
        (d.offline = !1),
        d.open('HEAD', a.getOption('checks.xhr.url'), !0),
        null != d.timeout && (d.timeout = a.getOption('checks.xhr.timeout')),
        b(d, a.markUp, a.markDown);
      try {
        d.send();
      } catch (e) {
        (c = e), a.markDown();
      }
      return d;
    }),
    (a.checks.image = function () {
      var b;
      return (
        (b = document.createElement('img')),
        (b.onerror = a.markDown),
        (b.onload = a.markUp),
        void (b.src = a.getOption('checks.image.url'))
      );
    }),
    (a.checks.down = a.markDown),
    (a.checks.up = a.markUp),
    (a.check = function () {
      return a.trigger('checking'), a.checks[a.getOption('checks.active')]();
    }),
    (a.confirmUp = a.confirmDown = a.check),
    (a.onXHR = function (a) {
      var b, c, e;
      return (
        (e = function (b, c) {
          var d;
          return (
            (d = b.open),
            (b.open = function (e, f, g, h, i) {
              return (
                a({
                  type: e,
                  url: f,
                  async: g,
                  flags: c,
                  user: h,
                  password: i,
                  xhr: b,
                }),
                d.apply(b, arguments)
              );
            })
          );
        }),
        (c = window.XMLHttpRequest),
        (window.XMLHttpRequest = function (a) {
          var b, d, f;
          return (
            (f = new c(a)),
            e(f, a),
            (d = f.setRequestHeader),
            (f.headers = {}),
            (f.setRequestHeader = function (a, b) {
              return (f.headers[a] = b), d.call(f, a, b);
            }),
            (b = f.overrideMimeType),
            (f.overrideMimeType = function (a) {
              return (f.mimeType = a), b.call(f, a);
            }),
            f
          );
        }),
        d(window.XMLHttpRequest, c),
        null != window.XDomainRequest
          ? ((b = window.XDomainRequest),
            (window.XDomainRequest = function () {
              var a;
              return (a = new b()), e(a), a;
            }),
            d(window.XDomainRequest, b))
          : void 0
      );
    }),
    (g = function () {
      return (
        a.getOption('interceptRequests') &&
          a.onXHR(function (c) {
            var d;
            return (
              (d = c.xhr),
              d.offline !== !1 ? b(d, a.markUp, a.confirmDown) : void 0
            );
          }),
        a.getOption('checkOnLoad') ? a.check() : void 0
      );
    }),
    setTimeout(g, 0),
    (window.Offline = a);
}.call(this),
  function () {
    var a, b, c, d, e, f, g, h, i;
    if (!window.Offline)
      throw new Error('Offline Reconnect brought in without offline.js');
    (d = Offline.reconnect = {}),
      (f = null),
      (e = function () {
        var a;
        return (
          null != d.state &&
            'inactive' !== d.state &&
            Offline.trigger('reconnect:stopped'),
          (d.state = 'inactive'),
          (d.remaining = d.delay =
            null != (a = Offline.getOption('reconnect.initialDelay')) ? a : 3)
        );
      }),
      (b = function () {
        var a, b;
        return (
          (a =
            null != (b = Offline.getOption('reconnect.delay'))
              ? b
              : Math.min(Math.ceil(1.5 * d.delay), 3600)),
          (d.remaining = d.delay = a)
        );
      }),
      (g = function () {
        return 'connecting' !== d.state
          ? ((d.remaining -= 1),
            Offline.trigger('reconnect:tick'),
            0 === d.remaining ? h() : void 0)
          : void 0;
      }),
      (h = function () {
        return 'waiting' === d.state
          ? (Offline.trigger('reconnect:connecting'),
            (d.state = 'connecting'),
            Offline.check())
          : void 0;
      }),
      (a = function () {
        return Offline.getOption('reconnect')
          ? (e(),
            (d.state = 'waiting'),
            Offline.trigger('reconnect:started'),
            (f = setInterval(g, 1e3)))
          : void 0;
      }),
      (i = function () {
        return null != f && clearInterval(f), e();
      }),
      (c = function () {
        return Offline.getOption('reconnect') && 'connecting' === d.state
          ? (Offline.trigger('reconnect:failure'), (d.state = 'waiting'), b())
          : void 0;
      }),
      (d.tryNow = h),
      e(),
      Offline.on('down', a),
      Offline.on('confirmed-down', c),
      Offline.on('up', i);
  }.call(this),
  function () {
    var a, b, c, d, e, f;
    if (!window.Offline)
      throw new Error('Requests module brought in without offline.js');
    (c = []),
      (f = !1),
      (d = function (a) {
        return (
          Offline.trigger('requests:capture'),
          'down' !== Offline.state && (f = !0),
          c.push(a)
        );
      }),
      (e = function (a) {
        var b, c, d, e, f, g, h, i, j;
        (j = a.xhr),
          (g = a.url),
          (f = a.type),
          (h = a.user),
          (d = a.password),
          (b = a.body),
          j.abort(),
          j.open(f, g, !0, h, d),
          (e = j.headers);
        for (c in e) (i = e[c]), j.setRequestHeader(c, i);
        return j.mimeType && j.overrideMimeType(j.mimeType), j.send(b);
      }),
      (a = function () {
        return (c = []);
      }),
      (b = function () {
        var b, d, f, g, h, i;
        for (
          Offline.trigger('requests:flush'), h = {}, b = 0, f = c.length;
          f > b;
          b++
        )
          (g = c[b]),
            (i = g.url.replace(/(\?|&)_=[0-9]+/, function (a, b) {
              return '?' === b ? b : '';
            })),
            (h[g.type.toUpperCase() + ' - ' + i] = g);
        for (d in h) (g = h[d]), e(g);
        return a();
      }),
      setTimeout(function () {
        return Offline.getOption('requests') !== !1
          ? (Offline.on('confirmed-up', function () {
              return f ? ((f = !1), a()) : void 0;
            }),
            Offline.on('up', b),
            Offline.on('down', function () {
              return (f = !1);
            }),
            Offline.onXHR(function (a) {
              var b, c, e, f, g;
              return (
                (g = a.xhr),
                (e = a.async),
                g.offline !== !1 &&
                ((f = function () {
                  return d(a);
                }),
                (c = g.send),
                (g.send = function (b) {
                  return (a.body = b), c.apply(g, arguments);
                }),
                e)
                  ? null === g.onprogress
                    ? (g.addEventListener('error', f, !1),
                      g.addEventListener('timeout', f, !1))
                    : ((b = g.onreadystatechange),
                      (g.onreadystatechange = function () {
                        return (
                          0 === g.readyState
                            ? f()
                            : 4 === g.readyState &&
                              (0 === g.status || g.status >= 12e3) &&
                              f(),
                          'function' == typeof b
                            ? b.apply(null, arguments)
                            : void 0
                        );
                      }))
                  : void 0
              );
            }),
            (Offline.requests = { flush: b, clear: a }))
          : void 0;
      }, 0);
  }.call(this),
  function () {
    var a, b, c, d, e;
    if (!Offline)
      throw new Error('Offline simulate brought in without offline.js');
    for (d = ['up', 'down'], b = 0, c = d.length; c > b; b++)
      (e = d[b]),
        (document.querySelector("script[data-simulate='" + e + "']") ||
          localStorage.OFFLINE_SIMULATE === e) &&
          (null == Offline.options && (Offline.options = {}),
          null == (a = Offline.options).checks && (a.checks = {}),
          (Offline.options.checks.active = e));
  }.call(this),
  function () {
    var a, b, c, d, e, f, g, h, i, j, k, l, m;
    if (!window.Offline)
      throw new Error('Offline UI brought in without offline.js');
    (b =
      '<div class="offline-ui"><div class="offline-ui-content"></div></div>'),
      (a = '<a href class="offline-ui-retry"></a>'),
      (f = function (a) {
        var b;
        return (
          (b = document.createElement('div')), (b.innerHTML = a), b.children[0]
        );
      }),
      (g = e = null),
      (d = function (a) {
        return k(a), (g.className += ' ' + a);
      }),
      (k = function (a) {
        return (g.className = g.className.replace(
          new RegExp('(^| )' + a.split(' ').join('|') + '( |$)', 'gi'),
          ' ',
        ));
      }),
      (i = {}),
      (h = function (a, b) {
        return (
          d(a),
          null != i[a] && clearTimeout(i[a]),
          (i[a] = setTimeout(function () {
            return k(a), delete i[a];
          }, 1e3 * b))
        );
      }),
      (m = function (a) {
        var b, c, d, e;
        d = { day: 86400, hour: 3600, minute: 60, second: 1 };
        for (c in d)
          if (((b = d[c]), a >= b)) return (e = Math.floor(a / b)), [e, c];
        return ['now', ''];
      }),
      (l = function () {
        var c, h;
        return (
          (g = f(b)),
          document.body.appendChild(g),
          null != Offline.reconnect &&
            Offline.getOption('reconnect') &&
            (g.appendChild(f(a)),
            (c = g.querySelector('.offline-ui-retry')),
            (h = function (a) {
              return a.preventDefault(), Offline.reconnect.tryNow();
            }),
            null != c.addEventListener
              ? c.addEventListener('click', h, !1)
              : c.attachEvent('click', h)),
          d('offline-ui-' + Offline.state),
          (e = g.querySelector('.offline-ui-content'))
        );
      }),
      (j = function () {
        return (
          l(),
          Offline.on('up', function () {
            return (
              k('offline-ui-down'),
              d('offline-ui-up'),
              h('offline-ui-up-2s', 2),
              h('offline-ui-up-5s', 5)
            );
          }),
          Offline.on('down', function () {
            return (
              k('offline-ui-up'),
              d('offline-ui-down'),
              h('offline-ui-down-2s', 2),
              h('offline-ui-down-5s', 5)
            );
          }),
          Offline.on('reconnect:connecting', function () {
            return d('offline-ui-connecting'), k('offline-ui-waiting');
          }),
          Offline.on('reconnect:tick', function () {
            var a, b, c;
            return (
              d('offline-ui-waiting'),
              k('offline-ui-connecting'),
              (a = m(Offline.reconnect.remaining)),
              (b = a[0]),
              (c = a[1]),
              e.setAttribute('data-retry-in-value', b),
              e.setAttribute('data-retry-in-unit', c)
            );
          }),
          Offline.on('reconnect:stopped', function () {
            return (
              k('offline-ui-connecting offline-ui-waiting'),
              e.setAttribute('data-retry-in-value', null),
              e.setAttribute('data-retry-in-unit', null)
            );
          }),
          Offline.on('reconnect:failure', function () {
            return (
              h('offline-ui-reconnect-failed-2s', 2),
              h('offline-ui-reconnect-failed-5s', 5)
            );
          }),
          Offline.on('reconnect:success', function () {
            return (
              h('offline-ui-reconnect-succeeded-2s', 2),
              h('offline-ui-reconnect-succeeded-5s', 5)
            );
          })
        );
      }),
      'complete' === document.readyState
        ? j()
        : null != document.addEventListener
        ? document.addEventListener('DOMContentLoaded', j, !1)
        : ((c = document.onreadystatechange),
          (document.onreadystatechange = function () {
            return (
              'complete' === document.readyState && j(),
              'function' == typeof c ? c.apply(null, arguments) : void 0
            );
          }));
  }.call(this));
