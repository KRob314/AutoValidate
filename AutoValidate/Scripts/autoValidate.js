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
                    autoValidate.checkInputs();
                    autoValidate.checkDropdowns();
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

    checkDropdowns: function()
    {
        var inputs = document.querySelectorAll("select");
        this.checkElements(inputs);
    },

    checkElements: function(inputs)
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

    showValidationModal: function()
    {
        if (this.validationMessage != "")
        {
            var modal = new Modal({
                content: "<p>" + this.validationMessage + "</p>",
                maxWidth: 600,
                overlay: false
            });

            modal.open();
        }
    },

    addBackgroundColor: function (ele)
    {
        ele.className += " autoValidate";
    },

    removeBackgroundColor: function (ele, modal)
    {
        ele.onkeyup = function ()
        {
            ele.className = ele.className.replace(/(?:^|\s)autoValidate(?!\S)/g, '');          
            document.querySelector(".autoValidate-modal").style.display = "none";
        };
    }

};

