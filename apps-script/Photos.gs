/**
 * Photos for the TV dashboard.
 *
 * Add this as a new file (Photos.gs) in the same Apps Script project as Code.gs.
 * It lists the pictures in a Google Drive folder named "Family TV Photos"
 * (in the Drive of the account that runs the script). The TV shows them in
 * random order and changes the picture every 15 seconds.
 *
 * In doGet(e), next to the line that handles e.parameter.weather (after the
 * access-key check), add:
 *
 *     if (e.parameter.photos) return photosResponse_();
 *
 * The folder must be shared as "Anyone with the link: Viewer" so the TV can
 * load the images. The folder link and photo IDs are never shown on the page
 * or stored in the GitHub repo; the script only gives them to a caller that
 * has the access key.
 */
var PHOTOS_FOLDER_NAME = 'Family TV Photos';

function photosResponse_() {
  var out;
  try {
    out = { photos: listPhotoIds_(), updated: Date.now() };
  } catch (err) {
    out = { photos: [], error: String(err && err.message || err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function listPhotoIds_() {
  var cache = CacheService.getScriptCache();
  var hit = cache.get('photoIds');
  if (hit) return JSON.parse(hit);

  var folders = DriveApp.getFoldersByName(PHOTOS_FOLDER_NAME);
  if (!folders.hasNext()) throw new Error('no Drive folder named "' + PHOTOS_FOLDER_NAME + '"');
  var ids = [];
  collect_(folders.next(), ids, 0);

  // Cache for 10 minutes so new uploads show up without hammering Drive.
  var json = JSON.stringify(ids);
  if (json.length < 90000) cache.put('photoIds', json, 600);
  return ids;
}

// Includes pictures in sub-folders (one level of album folders is common).
function collect_(folder, ids, depth) {
  var files = folder.getFiles();
  while (files.hasNext()) {
    var f = files.next();
    if (/^image\//.test(f.getMimeType())) ids.push(f.getId());
  }
  if (depth < 2) {
    var subs = folder.getFolders();
    while (subs.hasNext()) collect_(subs.next(), ids, depth + 1);
  }
}

/** Run once from the editor to check the folder is found and see the count. */
function testPhotos() {
  CacheService.getScriptCache().remove('photoIds');
  Logger.log(listPhotoIds_().length + ' photos found');
}
