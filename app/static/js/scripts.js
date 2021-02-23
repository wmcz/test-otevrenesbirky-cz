
let totalArtifactCount = 19007952
let openArtifactCount = 556280
let closedArtifactCount = totalArtifactCount - openArtifactCount

let openArtifactPercent = Math.floor(openArtifactCount / totalArtifactCount * 100)
let closedArtifactPercent = Math.floor(closedArtifactCount / totalArtifactCount * 100)

let openArtifactElement = "<div class='openArtifact'></div>";
let closedArtifactElement = "<div class='closedArtifact'></div>";

let result = [];
for (i = 0; i < openArtifactPercent; i++) {
  result.push(openArtifactElement);
}
for (i = 0; i < closedArtifactPercent; i++) {
  result.push(closedArtifactElement);
}

document.getElementById('collectionStats').innerHTML = result.join("");