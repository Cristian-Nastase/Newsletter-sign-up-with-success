const form = document.getElementById("form");

const errorMessage = document.getElementById("error-message");

const signUpForm = document.getElementById("sign-up-form");
const successMessage = document.getElementById("success-message");

const dismissButton = document.getElementById("dismiss-button");
const emailInput = document.getElementById("email");

const enterEmail = document.getElementById("enter-email");

form.addEventListener("submit", submit);
dismissButton.addEventListener("click", dismiss);
emailInput.addEventListener("focus", function()
{
    errorMessage.classList.add("hidden");
    emailInput.classList.remove("error");
})


function submit(e)
{
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    let validator = addressValidator(data.email);

    if(validator)
        {
            enterEmail.textContent = data.email;
            signUpForm.classList.toggle("hidden");
            successMessage.classList.toggle("hidden");   
        }
    else
        {
            errorMessage.classList.remove("hidden");
            emailInput.classList.add("error");
        }
}

// This will return true only if email is structure this way
// The email name starts with a letter and ends with a letter or a number
// There is an '@' character and the two sections around are not empty
// The domain contains a top level and a sub level, separated by a dot ('.') and they are not shorter than 2

function addressValidator(address)
{    
    let numbers = '0123456789';

    // this will look for a specific separator and check if it appears only once
    function splitWhenCharacter(string, character)
    {
        let index = -1;

        for(let i = 0; i < string.length; i++)
            {
                if(string[i] === character)
                    {
                        if(index < 0)
                            {
                                index = i;
                            }
                        else return -1;
                    }
            }
        
        return index;
    }

    function checkForLetters(string)
    {
        let array = string.split('');

        let bool = true;

        array.forEach(character => {
            if(character.toLowerCase() === character.toUpperCase()) bool = false;
        });

        return bool;

    }


    // Splitting the full email address

    let found = splitWhenCharacter(address, '@');

    if(found == -1) return false;

    let emailAddress = address.slice(0, found);
    let emailDomain = address.slice(found + 1, address.length);

    if(!emailDomain || !emailAddress)
        return false;

    // check if name is eligible

    let firstChr = emailAddress[0];
    let lastChr = emailAddress[emailAddress.length-1];

    if(!checkForLetters(firstChr) || !(checkForLetters(lastChr) ||  numbers.indexOf(lastChr) != -1))
        return false;

    // Splitting the Domain

    found = splitWhenCharacter(emailDomain, '.');

    if(found == -1) return false;

    let subDomain = emailDomain.slice(0, found);
    let topDomain = emailDomain.slice(found + 1, emailDomain.length);

    if(subDomain.length < 2 || topDomain.length < 2)
        return false;

    return (checkForLetters(subDomain) && checkForLetters(topDomain));
}

function dismiss()
{
    successMessage.classList.toggle('hidden');
    signUpForm.classList.toggle("hidden");
}
