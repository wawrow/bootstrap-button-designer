## Bootstrap Button Designer

A simple js Button Designer with class, icon and size picker.

## Installation

Required dependecies:

- `bootstrap.min.css@3.3.7`
- `font-awesome.min.css@4.7.0` *(optional, enabled by default)
- `ionicons.min.css@2.0.1` *(optional, enabled by default)
- `jquery.slim.min.js@3.3.1` *(will probably work with older)

Add to Head:

```
<link rel="stylesheet" href="dist/bootstrap-button-designer.css" media="screen">
<script src="dist/bootstrap-button-designer.all.min.js"></script>
```


## Usage

Define button:
```
<button type="button" class="btn btn-default button-designer"><i class="fa fa-plus"></i> Some Text Button 1</button>
```

Make it editable:
```
$('.button-designer').button_desinger()
```

Or With Options: 
```
$('.button-designer').button_desinger({styles : {
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
       'Block' : 'btn-block',
   },
   icons : ['fa', 'ion', 'glyphicons']
})`
```

**See Demo Here: [Click](https://wawrow.github.io/bootstrap-button-designer/).**

## License

The plugin is under MIT License
