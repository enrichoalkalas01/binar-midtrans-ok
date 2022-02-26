const Axios = require('axios')

const handleMainRequest = (req, res) => {
  // Perform Snap API request
  Axios({
    // Below is the API URL endpoint
    url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from("SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA").toString("base64")
      // Above is API server key for the Midtrans account, encoded to base64
    },
    data:
      // Below is the HTTP request body in JSON
      {
        transaction_details: {
          order_id: "order-csb-" + getCurrentTimestamp(),
          gross_amount: 10000
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          first_name: "Johny",
          last_name: "Kane",
          email: "testmidtrans@mailnesia.com",
          phone: "08111222333"
        }
      }
  }).then(
    (snapResponse) => {
      let snapToken = snapResponse.data.token;
      console.log("Retrieved snap token:", snapToken);
      // Pass the Snap Token to frontend, render the HTML page
      res.send(getMainHtmlPage(snapToken, handleMainRequest));
    },
    (error) => {
      res.send(`Fail to call API w/ error ${error}`);
      console.log(error);
    }
  );
};

const getCurrentTimestamp = () => {
  return "" + Math.round(new Date().getTime() / 1000);
};

let getMainHtmlPage = (snapToken, handleMainRequest) => {
    return `
    <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css">
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/monokai-sublime.min.css" />
        <style>pre{margin: -2em 0em -2em 0em;} .container{padding: 1em 1em;}</style>
        </head>
    
        <body class="container">
        <h4>Snap Payment Integration Demo</h4>
        <hr>
        <h5>Purchase Summary</h5>
        <small>
            <li><b>Customer Name:</b> Johny Kane</li>
            <li><b>Total Purchase:</b> IDR 10.000,-</li>
        </small>
        <br>
        <form id="snaphtml" onsubmit="return false" class="input-group">
            <!-- For example Snap Token is passed to this input field element --->
            <input type="text" id="snap-token" value="${snapToken}" class="form-input">
            <button id="pay-button" class="btn btn-primary input-group-btn">Proceed to Payment</button>
        </form>
        <small>
            <ul>
            <li>Click "Proceed to Payment" to test Snap Popup. <a href="javascript:location.reload();">Refresh this iframe</a> to get new Snap Token</li>
            <li>That string above is "Snap Transaction Token" retrieved from API response, on backend</li>
            </ul>
        </small>
        <br>
        <hr>
        <h4>1.Backend Implementation:</h4>
        <p>Call Midtrans Snap API to retrieve "Snap Transaction Token"</p>
        <pre>
            <code class="language-javascript" >
    ${
        `axios` +
        handleMainRequest.toString().split(`axios`)[1].split(`.then`)[0] +
        `.then( snapResponse => { 
            let snapToken = snapResponse.data.token;
            console.log("Retrieved snap token:", snapToken);
            // Pass the Snap Token to frontend, render the HTML page
            res.send(getMainHtmlPage(snapToken, handleMainRequest));
        })`
    }
    
    /**
     * Sample API HTTP response:
     * {
     *  "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862",
     *  "redirect_url":"https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
     * }
     */
            </code>
        </pre>
        <small>*Note: Axios (for example purpose) is the http-client used to send HTTP Request</small>
        <br><br><hr>
    
        <h4>2.Frontend Implementation</h4>
        <p>Pass "Snap Transaction Token" to frontend, import "snap.js" script tag, and call <code>snap.pay(&lt;snapToken&gt;)</code> to display payment popup.</p>
        <pre>
            <code class="language-html" id="snapjs-view"></code>
        </pre>
            
        <div id="snapjs">
            <!-- import the snap.js provided by Midtrans -->
            <script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key="SET_YOUR_CLIENT_KEY_HERE"></script>
    
            <script type="text/javascript">
            var payButton = document.getElementById('pay-button');
    
            /* For example trigger on button clicked, or any time you need */
            payButton.addEventListener('click', function() {
                /* in this case, the snap token is retrieved from the Input Field */
                var snapToken = document.getElementById('snap-token').value;
                snap.pay(snapToken);
            });
            </script>
        </div>
        <script>
            document.getElementById('snapjs-view').innerText
            = document.getElementById('snaphtml').innerHTML
            +document.getElementById('snapjs').innerHTML;
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/languages/javascript.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
        </body>
    </html>
  `;
};

exports.handleMainRequest = handleMainRequest