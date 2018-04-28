var T = {};

var elements = [5,8,10,3,1,6,9,7,2,0,4]; // item to be searched
var tracer = new DirectedGraphConstructTracer( " BST - Elements marked red indicates the current status of tree ", 0);
var tracer2 = new Array1DTracer( " Elements ").set ( elements );
var logger = new LogTracer( " Log ");
tracer.log(logger);

function bst_insert ( root, element, parent ) { // root = current node , parent = previous node
    tracer.visit ( root, parent ).wait ();
    var treeNode = T[root];
    var propName = '';    
    if ( element < root ) {
        propName = 'left';
    } else if ( element > root) {
        propName = 'right';
    }
    if(propName !== '') {
        if ( !treeNode.hasOwnProperty(propName) ) {  // insert as left child of root
            treeNode[propName] = element;
            T[element] = {};
            tracer.addNode(element, root).wait();
            logger.print( element + ' Inserted ');
        } else {
            bst_insert ( treeNode[propName], element, root );
        }
    }
}

var Root = elements[0]; // take first element as root
T[Root] = {};
tracer.addRoot(Root);
logger.print ( Root + ' Inserted as root of tree ');

for (var i = 1; i < elements.length; i++) {
    tracer2.select ( i ).wait();
    bst_insert ( Root, elements[i] ); // insert ith element
    tracer2.deselect( i ).wait();
    tracer.clearTraversal();
}