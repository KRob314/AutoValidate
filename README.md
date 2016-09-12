# AutoValidate.js

Javascript library for auto-validating text inputs and displaying a toast like notification for validation messages. Just needed a project to test out git and practice js design patterns  


##Custom Attributes
* `data-av:` element must have a value
* `data-av-message:` custom validation message

##Rules
* `nummber`: check for numeric value
* `email`: check for valid email (regex test for string@string.string)
* `url:` checks for valid url 
* `card`: check for valid credit card format
