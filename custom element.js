const data = [{
        "pincode": "110001",
        "estimatedDeliveryDays": 2,
        "locationName": "Connaught Place, Delhi"
    },
    {
        "pincode": "400001",
        "estimatedDeliveryDays": 3,
        "locationName": "Fort, Mumbai"
    },
    {
        "pincode": "700001",
        "estimatedDeliveryDays": 4,
        "locationName": "Dalhousie Square, Kolkata"
    },
    {
        "pincode": "600001",
        "estimatedDeliveryDays": 3,
        "locationName": "Parrys Corner, Chennai"
    },
    {
        "pincode": "500001",
        "estimatedDeliveryDays": 2,
        "locationName": "Afzal Gunj, Hyderabad"
    },
    {
        "pincode": "110020",
        "estimatedDeliveryDays": 5,
        "locationName": "Hauz Khas, Delhi"
    },
    {
        "pincode": "400020",
        "estimatedDeliveryDays": 4,
        "locationName": "Worli, Mumbai"
    },
    {
        "pincode": "700020",
        "estimatedDeliveryDays": 3,
        "locationName": "Salt Lake City, Kolkata"
    },
    {
        "pincode": "600020",
        "estimatedDeliveryDays": 2,
        "locationName": "Anna Nagar, Chennai"
    },
    {
        "pincode": "500020",
        "estimatedDeliveryDays": 4,
        "locationName": "Banjara Hills, Hyderabad"
    }
]

const inputElement = document.getElementById("inputElement")
const result = document.getElementById("result")


// custom-element.js
class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({
            mode: 'open'
        });

        // Create a div element in the shadow DOM
        const formElement = document.createElement('form');
        const inputElement = document.createElement("input")
        inputElement.setAttribute("id", "inputElement")
        formElement.appendChild(inputElement)

        const inputSubmit = document.createElement("input")
        inputSubmit.setAttribute("type", "submit")
        formElement.appendChild(inputSubmit)

        const result = document.createElement("div")
        result.setAttribute("id", "result")
        formElement.appendChild(result)


        formElement.addEventListener("submit", (event) => {
            event.preventDefault()
            result.textContent = ""
            const inputValue = inputElement.value;


            const getItem = data.filter((each) => each.pincode === inputValue)
            console.log(getItem)

            const estimatedTag = document.createElement("p")
            estimatedTag.textContent = "Estimated Date"
            result.appendChild(estimatedTag)


            if (getItem.length === 0) {
                const date = document.createElement("p")
                date.textContent = "Area Not Servisable"
                result.appendChild(date)
                return
            }

            const {
                estimatedDeliveryDays
            } = getItem[0]
            const today = new Date()
            console.log(estimatedDeliveryDays)
            today.setDate(today.getDate() + estimatedDeliveryDays);
            console.log(today)
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            };
            const dateFormatter = new Intl.DateTimeFormat('en-US', options);

            // Format the date using the Intl.DateTimeFormat object
            const formattedDate = dateFormatter.format(today);

            // Extract the day, date, and month components
            const day = formattedDate.split(',')[0].trim();
            const dateAndMonth = formattedDate.split(',')[1].trim();
            const date = document.createElement("p")
            date.textContent = `${day} ${dateAndMonth}`
            result.appendChild(date)

        })


        // Append the div element to the shadow DOM
        this.shadowRoot.appendChild(formElement);
    }
}

// Define the custom element
customElements.define('my-custom-element', MyCustomElement);