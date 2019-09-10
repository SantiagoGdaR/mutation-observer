function init() {
  if (window.MutationObserver) {
    startMutationObserver();
  } else {
    startMutationEvents();
  }
}

function startMutationObserver() {
  // target node to be observed
  var target = document.querySelector('body');
  // mutation observer config object with the listeners configuration
  var config = listenOnlyAttributeChanges();

  // mutation observer instantiation
  var mutationObs = new MutationObserver(callbackAttributeChange);

  // observe initialization
  mutationObs.observe(target, config);
}

function listenOnlyAttributeChanges() {
  return {
    attributes: true,
    childList: true,
    subtree: true
  };
}

function listenAllMutationChanges() {
  return {
    attributes: true,
    childList: true,
    subtree: true
  };
}

function callbackAttributeChange(mutations, mutationObs) {
  for (var i = 0, length = mutations.length; i < length; i++) {
    var mutation = mutations[i];
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-text-color') {
      var target = mutation.target;
      target.setAttribute("style", "color:" + target.getAttribute('data-text-color'));
    } else if (mutation.type === 'childList') {
      for (var i = 0, length = mutation.addedNodes.length; i < length; i++) {
        var addedNode = mutation.addedNodes[i];
        if(addedNode.nodeName !== '#text') {
          addedNodes++;
          updateNodeCount();
        }
      }
    }
  }
}

function changeAttrTextColor() {
  var elem = document.querySelector('.attr-example');
  var color = elem.getAttribute('data-text-color') === '#FF0000' ? '#FFFF00' : '#FF0000';
  elem.setAttribute('data-text-color', color);
}

var addedNodes = 0;

function addNode(){
  var parent = document.querySelector('.nodes-playground');
  var node = document.createElement("DIV");
  var textNode = document.createTextNode("added node");
  node.appendChild(textNode);
  parent.appendChild(node);
}

function updateNodeCount() {
  var addedNodeCount = document.querySelector('.added-nodes');
  addedNodeCount.innerText = addedNodes;
}

init();
