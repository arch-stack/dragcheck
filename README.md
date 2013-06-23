dragcheck
=========

A jQuery javascript drag checking plugin for checkboxes

[Basic demo](http://jsfiddle.net/arch/Qp5GP/)

[Add class on select](http://jsfiddle.net/arch/c4fCP/2/)

Allows clicking and then dragging across checkboxes to check/uncheck them
If you skip a bunch and go to a later checkbox it will fill in the missing ones in between

To use in a basic table case:

    $('selector').dragcheck({
        container: 'tr',
        onSelect: function(obj, state) {
            obj.prop('checked', state);
        }
    });

Options:

- container: The element that contains the checkboxes and has other sibling container elements that contain checkboxes

For example if you do:

    $('table tbody').dragcheck({
        container: 'tr',
        onSelect: function(obj, state) {
            obj.prop('checked', state);
        }
    });

Then the checkboxes in the tbodys trs will be affected by dragcheck but this will exclude any checkboxes in the thead

- onSelect: When the checkbox is selected to be checked, this method will be called. You can choose to check the box,
or run a condition and optionally check the box or do anything you want


The overall goal of this plugin is to provide an easy way for the user to click and drag down to check checkboxes instead
of having to slowly click each one. The original use was for checkboxes in the first column of a table with tabular data
