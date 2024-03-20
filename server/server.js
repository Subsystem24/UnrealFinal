const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config.json');
const BoxSDK = require('box-node-sdk');
const sdk = BoxSDK.getPreconfiguredInstance(config);
const client = sdk.getAppAuthClient('enterprise');
const path = require('path');
const port = process.env.PORT || 3000;
const cors = require('cors');

require('dotenv').config();

const app = express();
const { SECRET } = process.env;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());

async function getFoldersAndSubfolders() {
  const folders = [];
  try {
      const firstResponse = await client.folders.getItems('0');
      firstResponse.entries.forEach(file => {
          if (file.type === "folder") {
              folders.push(file);
          }
      });
      // console.log(folders);
      let matchedItemId = null;
      for (let folder of folders) {
          if (folder.name === "3D catalouge") {
              matchedItemId = folder.id;
              break;
          }
      }
      // console.log(matchedItemId);
      return matchedItemId;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
}

app.get("/error", (req, res) => {
  res.render('error.hbs');
})

app.get('/api', (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/", (req, res) => {
  res.render('index.hbs', {layout: false});
});

app.get('/api/catalog', async (req, res) => {
  try {
    const folderId = "229972117621";
    const folderDetails = await client.folders.get(folderId);
    const folderName = folderDetails.name;
    const items = await client.folders.getItems(folderId, { limit: 100 });
    const files = items.entries.filter(item => item.type === 'file');
    files.forEach(file =>{
      file.name = file.name.split(".")[0];

    })
    const folders = items.entries.filter(item => item.type === "folder");
    if(folderDetails["parent"] !== null) {
      const parentId = folderDetails["parent"].id
      res.json({ files: files, folders: folders, folderName: folderName, isLoggedIn: true, folderId: folderId, arentId: parentId  });
    } else {
      res.json({ files: files, folders: folders, folderName: folderName, isLoggedIn: true, folderId: folderId });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

app.get('/api/stream/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;
    if (!client._session || !client._session._tokenInfo) {
      return res.redirect("/")
    }
    const ACCESS_TOKEN = client._session._tokenInfo.accessToken;
    const fileInfo = await client.files.get(fileId);
    const fileName = fileInfo.name.split(".");
    const splitedFileName = fileName[0];
    const BOX_API_ENDPOINT = `https://api.box.com/2.0/files/${fileId}/content?access_token=${ACCESS_TOKEN}`;

    const [date, time] = fileInfo.created_at.split("T");
    // res.render('file', { file: BOX_API_ENDPOINT, date: date, isLoggedIn: true, fileName: splitedFileName, fileInfo: fileInfo});
    res.json({ file: BOX_API_ENDPOINT, date: date, isLoggedIn: true, fileName: splitedFileName, fileInfo: fileInfo});
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
