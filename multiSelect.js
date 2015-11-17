(function ($) {

    'use strict';

    function MultiSelect($el, options) {
        $el.hide();

        var that = this;
        this.multiple = $el.attr('multiple');
        this.values = [];
        this.onCHange = function () {
            var values = [];
            $el.find('option:selected').each(function () {
                values.push($(this).val());
            });
            options.onCHange(values)
        }
        this.$choice = $('<div class="ui selection dropdown" tabindex="0" />');
        this.$choice.append('<i class="dropdown icon" /i>');
        this.$choice.append('<div class="default text">' + options.defaultText + '</div>');
        //add menu
        this.$menu = $('<div class="menu" />');
        this.init = function () {
            this.$chackAll = $('<div class = "item" ><div class="ui checkbox"><input type="checkbox"><label></label></div> Select All </div>');
            if (that.multiple) {
                if ($el.find('option').length > 0) {
                    that.$menu.append(that.$chackAll);
                } else {
                    that.$menu.append('<div class = "item" >Not data</div>');
                }
                that.$choice.find('.text').removeClass('default').text('0 of ' + $el.find('option').length + ' Seleted');
            }
            $el.find('option').each(function () {
                if (that.multiple) {
                    var $item = $('<div class = "item" data-value = "' + $(this).val() + '" ><div class="ui checkbox"><input type="checkbox"><label></label></div>' + $(this).text() + '</div>');
                    that.$menu.append($item);
                    var option = this;
                    $item.on('click', function (event) {
                        event.stopPropagation();
                        if ($el.find('option').length === ($el.find('option:selected').length + 1)) {
                            that.$chackAll.find('input[type="checkbox"]').prop('checked', true);
                        } else {
                            that.$chackAll.find('input[type="checkbox"]').prop('checked', false);
                        }
                        if ($item.find('input[type="checkbox"]').prop('checked')) {
                            $(option).prop('selected', true);
                        } else {
                            $(option).prop('selected', false);
                        }
                        if ($(event.target).is('input[type="checkbox"]'))
                            return;
                        if (!$item.find('input[type="checkbox"]').prop('checked')) {
                            $(option).prop('selected', true);
                        } else {
                            $(option).prop('selected', false);
                        }
                        $item.find('input[type="checkbox"]').prop('checked', !$item.find('input[type="checkbox"]').prop('checked'));

                    });
                } else {
                    that.$menu.append('<div class = "item" data-value = "' + $(this).val() + '" >' + $(this).text() + '</div>');
                }
            });
            that.$chackAll.on('click', function (event) {
                event.stopPropagation();
                if (!that.$chackAll.find('input[type="checkbox"]').prop('checked')) {
                    that.$menu.find('input[type="checkbox"]').prop('checked', false);
                    $el.find('option').prop('selected', false);
                } else {
                    that.$menu.find('input[type="checkbox"]').prop('checked', true);
                    $el.find('option').prop('selected', true);
                }
                if ($(event.target).is('input[type="checkbox"]'))
                    return;
                if (that.$chackAll.find('input[type="checkbox"]').prop('checked')) {
                    that.$menu.find('input[type="checkbox"]').prop('checked', false);
                    $el.find('option').prop('selected', false);
                } else {
                    that.$menu.find('input[type="checkbox"]').prop('checked', true);
                    $el.find('option').prop('selected', true);
                }
            });
            that.$choice.append(that.$menu);
        }
        this.init();
        $(document).click(function (event) {
            if ($(event.target).is(that.$choice) || $(event.target).parent().is(that.$choice)) {
                that.$choice.addClass('active visible');
                that.$menu.transition('slide down');
            } else {
                if (!that.$choice.hasClass('active'))
                    return;
                that.$choice.removeClass('active');
                that.$choice.removeClass('visible');
                that.$menu.transition('hide', 'slide down');
                if (that.multiple) {
                    that.$choice.find('.text').text(($el.find('option:selected').length) + ' of ' + $el.find('option').length + ' Seleted');
                    that.onCHange();
                }

            }
        });
        that.$menu.find('.item').click(function (event) {
            if (that.multiple) {
                event.stopPropagation();
            } else {
                $el.val($(this).attr('data-value'));
                that.$choice.find('.text').removeClass('default').text($(this).text());
            }
        });
        this.loading = function () {
            that.$choice.addClass('loading disabled');
        }
        this.refresh = function () {
            that.$menu.html('');
            that.$choice.removeClass('loading disabled');
            that.init();
        }
        $el.after(this.$choice);
    }
    var methods = {
        init: function (options) {

        },
        update: function () { }// !!!
    };
    $.fn.multiSelect = function () {
        var option = arguments[0],
                args = arguments,
                value,
                allowedMethods = [
                    'refresh'
                ];

        this.each(function () {
            var $this = $(this),
                    data = $this.data('multiSelect'),
                    options = $.extend({}, $.fn.multiSelect.defaults,
                            $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new MultiSelect($this, options);
                $this.data('multiSelect', data);
            }

            if (typeof option === 'string') {
                value = data[option](args[1]);
            } else {
                if (args[1]) {
                    value = data[args[1]].apply(data, [].slice.call(args, 2));
                }
            }
        });
        return value ? value : this;
    }
    $.fn.multiSelect.defaults = {
        defaultText: 'test',
        onCHange: function (values) {

        }
    }
}($));
