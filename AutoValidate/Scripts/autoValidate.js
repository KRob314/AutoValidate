/// <reference path="autoValidate-modal.js" />


var autoValidate =
{

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
                });
            }
        }
    },

    checkInputs: function ()
    {
        var inputs = document.querySelectorAll("input[type=text]");
        var msg = "";
        var isFirstFind = false;

        for (var i = 0; i <= inputs.length - 1; i++)
        {
            if (inputs[i].hasAttribute("data-av"))
            {
                if (inputs[i].value == "")
                {
                    if (inputs[i].hasAttribute("data-av-message"))
                    {
                        msg += inputs[i].getAttribute("data-av-message");
                        console.log(msg);
                    }
                    else
                    {
                        var elementName = inputs[i].getAttribute("name");
                        msg += "Please enter a value for " + elementName + "\n";
                        console.log(msg);
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
           var modal = new Modal({
                content: "<p>" + msg +  "</p>" ,
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

