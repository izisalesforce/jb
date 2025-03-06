var connection = new Postmonger.Session();

// Trigger 'ready' so Journey Builder knows the UI is loaded
connection.trigger('ready');

connection.on('initActivity', function(data) {
  document.getElementById('configuration').value = JSON.stringify(data);
});

document.getElementById('saveButton').addEventListener('click', function() {
  // Simulate "clickedNext" or "updateActivity"
  var configuration = JSON.parse(document.getElementById('configuration').value);
  connection.trigger('updateActivity', configuration);
});
