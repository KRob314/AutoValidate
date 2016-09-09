/// <reference path="autoValidate-modal.js" />


var autoValidate =
{
    validationMessage: "",

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


        radioButtons.forEach(function (radio)
        {
            if (radio.hasAttribute("data-av"))
            {
                if (radioNames.indexOf(radio.getAttribute("name")) > -1)
                {
                    // radiobutton name already added
                }
                else
                {
                    radioNames.push(radio.getAttribute("name"));
                }
            }
        });

        radioNames.forEach(function (radioName)
        {
            var radiosByGroup = document.getElementsByName(radioName);
            var checkedValue = getCheckedValue(radioName);
            var msg = "";

            if (checkedValue == null)
            {
                if (radiosByGroup[0].attributes.getNamedItem("data-av-message") != null)
                {
                    //console.log(radiosByGroup[0]);
                    msg += radiosByGroup[0].getAttribute("data-av-message");
                }
                else
                {
                    msg += "Please select a radio button for " + radioName;
                }

                autoValidate.addBackgroundColor(radiosByGroup[0]);
                autoValidate.removeBackgroundColor(radiosByGroup[0], this.modal);
            }

            if (msg != "")
            {
                this.validationMessage += msg;
            }

        });

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
        var isFirstFind = false;
        var msg = "";

        for (var i = 0; i <= inputs.length - 1; i++)
        {
            if (inputs[i].hasAttribute("data-av"))
            {
                if (inputs[i].value == "" || inputs[i].selectedIndex == 0)
                {
                    if (inputs[i].hasAttribute("data-av-message"))
                    {
                        msg += inputs[i].getAttribute("data-av-message") + "</br>";
                        //console.log(msg);
                    }
                    else
                    {
                        var elementName = inputs[i].getAttribute("name");
                        msg += "Please select a value for " + elementName + "</br>";
                        //console.log(msg);
                    }

                    this.addBackgroundColor(inputs[i]);
                    this.removeBackgroundColor(inputs[i], this.modal);

                    if (isFirstFind == false)
                    {
                        isFirstFind = true;
                        inputs[i].focus();
                    }
                }
            }
        }

        if (msg != "")
        {
            this.validationMessage += msg;
        }

    },

    showValidationModal: function ()
    {
        if (this.validationMessage != "")
        {
            var modal = new Modal({
                content: "<p>" + this.validationMessage + "</p>",
                maxWidth: 600,
                overlay: false
            });

            modal.open();
            autoValidate.validationMessage = "";
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

        if (ele.nodeName.toLowerCase() === "select")
        {
            ele.onmouseover = function ()
            {
                ele.className = ele.className.replace(/(?:^|\s)autoValidate(?!\S)/g, '');
            }
        }
        else
        {

            if (ele.getAttribute("type") == "text")
            {
                ele.onmouseover = function ()
                {
                    ele.className = ele.className.replace(/(?:^|\s)autoValidate(?!\S)/g, '');
                    document.querySelector(".autoValidate-modal").style.display = "none";
                };
            }
            else if (ele.getAttribute("type") == "radio")
            {
                ele.parentElement.onmouseover = function ()
                {
                    ele.parentElement.className = ele.parentElement.className.replace(/(?:^|\s)autoValidate-pulse(?!\S)/g, '');
                    document.querySelector(".autoValidate-modal").style.display = "none";
                };
            }
        }


    }

};

