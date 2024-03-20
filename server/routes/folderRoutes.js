const express = require('express');
const router = express.Router();
const BoxSDK = require('box-node-sdk');
const config = require('../config.json');
const sdk = BoxSDK.getPreconfiguredInstance(config);
const client = sdk.getrouterAuthClient('enterprise');
const verifyToken = require('../middleware/verifyToken');

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

router.get('/dashboard', (req, res) => {
    getFoldersAndSubfolders()
    .then(matchedId => {
      // console.log(matchedId);
      res.redirect(`/folder/${matchedId}`)
    })
    .catch(error => {
      console.error("Error:", error);
      res.render("login");
    });
  }
  );


router.get('/folder/:folderId', verifyToken, async (req, res) => {
  try {
    const folderId = req.params.folderId;
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
      res.render('folder', { files: files, folders: folders, folderName: folderName, isLoggedIn: true, folderId: folderId, parentId: parentId  });
    } else {
      res.render('folder', { files: files, folders: folders, folderName: folderName, isLoggedIn: true, folderId: folderId });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

router.get('/stream/:fileId', verifyToken, async (req, res) => {
  try {
    const fileId = req.params.fileId;
    if (!client._session || !client._session._tokenInfo) {
      return res.redirect("/dashboard")
    }
    const ACCESS_TOKEN = client._session._tokenInfo.accessToken;
    // console.log(ACCESS_TOKEN);
    const fileInfo = await client.files.get(fileId);
    const fileName = fileInfo.name.split(".");
    const splitedFileName = fileName[0];
    const BOX_API_ENDPOINT = `https://api.box.com/2.0/files/${fileId}/content?access_token=${ACCESS_TOKEN}`;
    const userEmail = req.userEmail;
    const [date, time] = fileInfo.created_at.split("T");
    db.execute(
      'SELECT * FROM users WHERE email = ?',
      [userEmail],
      function(err, users) {
        if (err) {
          res.status(500).send('Error fetching user details.');
          return;
        }
        if (users.length == 0) {
          res.status(404).send('User not found.');
          return;
        }
        res.render('file', { file: BOX_API_ENDPOINT, date: date, isLoggedIn: true, user: users[0], fileName: splitedFileName, fileInfo: fileInfo });
      }
    );
  } catch (error) {
    console.error("Error streaming video:", error.message);
    res.status(500).send('Failed to stream video');
  }
});

module.exports = router;
