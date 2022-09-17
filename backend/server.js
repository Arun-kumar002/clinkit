const express = require('express')
const fast2sms = require('fast-two-sms');
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let port = 4001

app.post('/', (req, res) => {
  let { number } = req.body;
  console.log(number)
  var options = {
    authorization: 'lmLEDsGhJBSiOGS64ueNnQlRJzG1CGwSaZWDhypXANQU6QSYD9ow0TLieNLp',
    message: 'test otp code is  YOUR_MESSAGE_HERE-5488',
    numbers: [number]
  };

  console.log(`message sent successfully to ${number}`)

  fast2sms.sendMessage(options).then((response) => {
    console.log(response);
  }).catch(err => {
    console.log(err);
  });
})

app.listen(port, () => console.log(`server has started on port: ${port}`))

