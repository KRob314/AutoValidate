# AutoValidate.js

Javascript library for auto-validating element values and displaying a toast like notification for validation messages.  

##How to Use
To require a value, add a `data-av` attribute
```html
<input type="text" name="first name" data-av="" /> 
```
To add a custom validation message, add a `data-av-message` attribute. If one is not provided, the default message will be “Please enter a value for {the element’s name}.” If the element does not have a name, well, I have not gotten that far yet
```html
  <input type="text" name="first name" data-av="" data-av-message="Please enter your first name" />
```
To require a dropdown to have a selected value, but ignore the first item in the dropdown 
```html
<select name="Icecream Flavours" data-av="" data-av-ignore="0" >
    <option>---</option>
    <option value="double chocolate">Double Chocolate</option>
    <option value="vanilla">Vanilla</option>
    <option value="strawberry">Strawberry</option>
    <option value="caramel">Caramel</option>
</select>
```



##Custom Attributes
* `data-av:` element must have a value
* `data-av-message:` custom validation message

##Rules
* `nummber`: check for numeric value
* `email`: check for valid email (regex test for string@string.string)
* `url:` checks for valid url 

