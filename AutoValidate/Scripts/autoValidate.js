﻿/// <reference path="autoValidate-modal.js" />


var autoValidate =
{
    _validationMessage: "",
    Options: { RemoveBackgroundOnChange: true, RemoveBackgroundOnHover: false },


    init: function (formId)
    {
        var buttons = document.querySelectorAll("input[type=button]");

        for (var i = 0; i < buttons.length; i++)
        {
            if (buttons[i].hasAttribute("data-av"))
            {
                buttons[i].addEventListener("click", function (e)
                {
                    autoValidate.checkDropdowns();
                    autoValidate.checkRadioButtons();
                    autoValidate.checkInputs();
                    autoValidate.showValidationModal();
                });
            }
        }
    },

    checkInputs: function ()
    {
        var inputs = document.querySelectorAll("input[type=text]");
        this.checkElements(inputs);
    },

    checkDropdowns: function ()
    {
        var inputs = document.querySelectorAll("select");
        this.checkElements(inputs);
    },

    checkRadioButtons: function ()
    {
        var radioButtons = document.querySelectorAll("input[type=radio]"); // get all radio buttons
        var radioNames = []; // store unique names of radio buttons

        console.log(radioButtons);

        for (var i = 0; i >= radioButtons.length; i++)
        {
            console.log(radioButtons[i]);

            if(radioButtons[i].attributes.getNamedItem("data-av"))
            {
                if (radioButtons[i].hasAttribute("data-av"))
                {
                    if (radioNames.indexOf(radioButtons[i].getAttribute("name")) > -1)
                    {
                        // radiobutton name already added
                    }
                    else
                    {
                        radioNames.push(radioButtons[i].getAttribute("name"));
                    }
                }
            }
        }


        for (var i = 0; i = radioNames.length; i++)
        {
            var radiosByGroup = document.getElementsByName(radioNames[i]);
            var checkedValue = getCheckedValue(radioNames[i]);
            var msg = "";

            if (checkedValue == null)
            {
                if (radiosByGroup[0].attributes.getNamedItem("data-av-message") != null)
                {
                    //console.log(radiosByGroup[0]);
                    msg += radiosByGroup[0].getAttribute("data-av-message") + "</br>";
                }
                else
                {
                    msg += "Please select a radio button for " + radioNames[i] + "</br>";
                }

                autoValidate.addBackgroundColor(radiosByGroup[0]);
                autoValidate.removeBackgroundColor(radiosByGroup[0], this.modal);
            }

            autoValidate._validationMessage += msg;
        }

        function getCheckedValue(groupName)
        {
            var radios = document.getElementsByName(groupName);
            for (i = 0; i < radios.length; i++)
            {
                if (radios[i].checked)
                {
                    return radios[i].value;
                }
            }
            return null;
        }

        // this.checkElements(inputs);
    },

    checkElements: function (inputs)
    {
        var msg = "";

        for (var i = 0; i <= inputs.length - 1; i++)
        {
            if (inputs[i].hasAttribute("data-av"))
            {
                var avRule = getValidationRule(inputs[i].getAttribute("data-av"));

                if (avRule != "")
                    checkValidationRule(avRule, inputs[i]);

                if (inputs[i].value == "" || inputs[i].selectedIndex == 0)
                {
                    msg += autoValidate.addValidationMessage(inputs[i], avRule);

                    this.addBackgroundColor(inputs[i]);
                    this.removeBackgroundColor(inputs[i], this.modal);

                    if (document.querySelector(".autoValidate"))
                        document.querySelector(".autoValidate").focus();
                }
            }
        }

        this._validationMessage += msg;

        function getValidationRule(attributeValue)
        {
            var rules = ["number", "email", "between"];
            if (rules.indexOf(attributeValue) > -1)
                return attributeValue
            else
                return ""
        }

        function checkValidationRule(rule, element, ruleValue)
        {
            var isValid = true;

            switch (rule.toLowerCase())
            {
                case "number":
                    isValid = isNumeric(element.value);
                    break;
                case "email":
                    isValid = isEmail(element.value)
                    break;
                case "url":
                    isValid = isURL(element.value);
                    break;
                case "between":
                    isValid = isBetween(element);
                    console.log(isValid);
                    break;
            }

            function isNumeric(n)
            {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            function isEmail(email)
            {
                var re = /\S+@\S+\.\S+/;
                return re.test(email);
            }

            function isURL(str)
            {
                var re = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
                return re.test(str);
            }

            function isBetween(ele)
            {
                var betweenValue = ele.getAttribute("data-av-value").split(":");
                var eleValue = ele.value;

                console.log(eleValue + "\n" + betweenValue[0] + "\n" + betweenValue[1]);

                if (Number(eleValue) > Number(betweenValue[0]) && Number(eleValue) < Number(betweenValue[1]))
                    return true;
                else
                    return false;
            }

            if (isValid === false)
            {
                autoValidate.addValidationMessage(element, rule);
            }

            return isValid;
        }

    },

    getRuleMessage: function (avRule)
    {
        if (avRule === "number")
            return "numeric ";
        if (avRule === "email")
            return "valid email ";

        return "";
    },

    addValidationMessage: function (ele, avRule)
    {
        var dataType = avRule == undefined ? "" : avRule;

        if (ele.hasAttribute("data-av-message"))
        {
            return ele.getAttribute("data-av-message") + "</br>";
        }
        else
        {
            if (ele.nodeName.toLowerCase() == "input" && ele.getAttribute("type") == "text") // textbox
            {
                var elementName = ele.getAttribute("name");
                return "Please enter a " + autoValidate.getRuleMessage(dataType) + "value for " + elementName + "</br>";
            }
            else // radio and dropdown
            {
                var elementName = ele.getAttribute("name");
                return "Please select a value for " + elementName + "</br>";
            }
        }
    },

    showValidationModal: function ()
    {
        if (this._validationMessage != "")
        {
            var modal = new Modal({
                content: "<p>" + this._validationMessage + "</p>",
                maxWidth: 600,
                overlay: false
            });

            modal.open();
            autoValidate._validationMessage = "";
        }
    },

    addBackgroundColor: function (ele)
    {
        if (ele.getAttribute("type") == "radio")
        {
            ele.parentElement.className += " autoValidate-pulse";
        }
        else
        {
            ele.className += " autoValidate";
        }
    },

    removeBackgroundColor: function (ele, modal)
    {
        if (ele.nodeName.toLowerCase() === "select" || ele.getAttribute("type") == "text")
        {
            if(this.Options.RemoveBackgroundOnHover === true)
            {
                ele.onmouseover = function ()
                {
                    ele.className = ele.className.replace(/(?:^|\s)autoValidate(?!\S)/g, '');
                    hideModal();
                }
            }

            if(this.Options.RemoveBackgroundOnChange === true)
            {
                ele.onchange= function()
                {
                    ele.className = ele.className.replace(/(?:^|\s)autoValidate(?!\S)/g, '');
                    hideModal();
                }
            }
        }
        else if (ele.getAttribute("type") == "radio")
        {
            if (this.Options.RemoveBackgroundOnHover === true)
            {
                ele.parentElement.onmouseover = function ()
                {
                    ele.parentElement.className = ele.parentElement.className.replace(/(?:^|\s)autoValidate-pulse(?!\S)/g, '');
                    hideModal();
                };
            }
        }

        function hideModal()
        {
                var avModal = document.querySelector(".autoValidate-modal");
                if (avModal != null)
                    avModal.remove();
        }
    }
};

