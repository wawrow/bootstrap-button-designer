
(function ( $ ) {

    var EXTRA_CLASS_TEMPLATE  = '<div class="row"><div class="col-sm-4"><label>{{label}}</label></div><div class="col-sm-8"><label class="switch"><input type="checkbox" data-button-class="{{value}}"><span class="slider round"></span></label></div>';
    var BUTTON_STYLE_TEMPLATE =  '<button type="button" class="btn {{value}} btn-block" data-button-class="{{value}}">{{label}}</button>';
    var BUTTON_SIZE_TEMPLATE = '<button type="button" class="btn {{value}} btn-block" data-button-size="{{value}}">{{label}}</button>';
    var ICON_PICKER_TEMPLATE = '<li><a role="button" href="#" class="iconpicker-item"><i class="{{value}}"></i> {{value}}</a></li>';

    var parse_templates = function(designer_template, section_name, section_contents, template){
        designer_template.find(section_name).empty();
        for(item in section_contents){
            designer_template.find(section_name).append(
                template.split("{{label}}").join(item)
                    .split("{{value}}").join(section_contents[item])
            )
        }
    };



    var init_button_designer = function(button, buttondesigner, options) {

        buttondesigner.find('button').click(function () {
            if ($(this).data('button-class') !== undefined) {
                button.data('button-class', $(this).data('button-class'));
            }
            if ($(this).data('button-size') !== undefined) {
                button.data('button-size', $(this).data('button-size'));
            }
            button.trigger("updateDesign");
        });

        buttondesigner.find('input[type="checkbox"]').on('click', function () {
            var self = $(this);
            var state = self.is(':checked');
            if ($(this).data('button-class') === undefined) {
                button.removeData(self.data('button-property'));
                button.data(self.data('button-property'), state);
            }
            else {
                button.removeData(self.data('button-class'));
                button.data(self.data('button-class'), state);
            }
            button.trigger("updateDesign");
        });

        var iconclick = function () {
            var icon = $(this).find('i').attr('class');
            button.data('button-icon', icon);
            buttondesigner.find('[data-button-property=button-icon]').val(icon);
            button.trigger("updateDesign");
        };

        buttondesigner.find('.iconpicker-item').on('click', iconclick);

        buttondesigner.find('input[type="text"][data-button-property]').on('change paste keyup', function () {
            var self = $(this);
            button.data(self.data('button-property'), self.val());
            button.trigger("updateDesign");
        });

        var filter_timout = undefined;

        buttondesigner.find('input[type=text][data-button-property=button-icon]').on('change paste keyup', function () {
            clearTimeout(filter_timout);
            var search = $(this).val();
            if(!$(this).closest('.dropdown').hasClass('open'))
                $(this).closest('.dropdown').find('[data-toggle=dropdown]').dropdown('toggle');
            filter_timout = setTimeout(function(){
                var filteredData = ICONS_LIST.filter(function(item) {
                    return item.indexOf(search) > -1;
                });
                console.log(filteredData.length);
                if(filteredData.length > 0) {
                    parse_templates(buttondesigner, '.icon-list', filteredData, ICON_PICKER_TEMPLATE);
                    buttondesigner.find('.iconpicker-item').on('click', iconclick);
                } else {
                    buttondesigner.find('.icon-list').empty();
                    buttondesigner.find('.icon-list').append('<li>No icons matching search.</li>')
                }
                }, 500);
        });

        buttondesigner.find('input[data-button-property=button-text]').val(button.text());
        button.data('button-text', button.text());
        if(button.has('i')){
            buttondesigner.find('input[data-button-property=button-icon]').val(button.children('i').attr('class'));
            button.data('button-icon', button.children('i').attr('class'));
        }
    };

    $.fn.button_desinger = function( options ) {

        var settings = $.extend({
            styles : {
                "Default": 'btn-default',
                "Primary": 'btn-primary',
                "Success": 'btn-success',
                "Info": 'btn-info',
                "Warning": 'btn-warning',
                "Danger": 'btn-danger'
            },
            sizes : {
                "XSmall": 'btn-xs',
                "Small" : "btn-sm",
                "Default" : "",
                "Large" : "btn-lg"
            },
            extra_classes : {
                'Round' : 'btn-round',
                'Shadow' : 'btn-shadow',
                'Block' : 'btn-block'
            }
            //icons : ['fa', 'ion', 'glyphicons'],
        }, options );



        var designer_template = $($('#buttondesignerdiv').html());

        parse_templates(designer_template, '.button-styles', settings['styles'], BUTTON_STYLE_TEMPLATE);
        parse_templates(designer_template, '.button-sizes', settings['sizes'], BUTTON_SIZE_TEMPLATE);
        parse_templates(designer_template, '.button-classes', settings['extra_classes'], EXTRA_CLASS_TEMPLATE);
        parse_templates(designer_template, '.icon-list', ICONS_LIST, ICON_PICKER_TEMPLATE);

        return this.each(function() {
            var self = $(this);
            self.on("updateDesign", function () {
                $(this).removeClass();
                $(this).addClass('btn');
                $(this).addClass($(this).data('button-class'));
                $(this).addClass($(this).data('button-size'));
                for(extra_class in settings['extra_classes']){
                    if($(this).data(settings['extra_classes'][extra_class]))
                        $(this).addClass(settings['extra_classes'][extra_class]);
                }
                $(this).empty();
                $(this).text($(this).data('button-text'));
                var i = document.createElement("i");
                $(i).addClass($(this).data('button-icon'));
                if ($(this).data('button-image-alignement'))
                    $(this).append(i);
                else
                    $(this).prepend(i);
                $(this).trigger('update.bs.button-designer');
            });

            self.popover({
                html : true,
                content: function() {
                    var new_designer = $(designer_template.html());
                    init_button_designer(self, new_designer , settings);
                    return new_designer;
                },
                placement: 'auto'
            });


            $(document).on('click', function (e) {
                    if (!self.is(e.target) && self.has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                        ((self.popover('hide').data('bs.popover')||{}).inState||{}).click = false
                    }
            });

            return self;
        });
    };

}( jQuery ));


