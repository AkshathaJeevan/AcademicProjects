package assignment2;

import java.util.Iterator;
import java.util.LinkedList;

public class OnProbationFilter<E> implements Iterator<E> {

	protected NodeFactory<E> currentNode;
	private static final double probationFilter = 2.85;
	protected LinkedList<NodeFactory<E>> nodesList = new LinkedList<NodeFactory<E>>();
	
	public OnProbationFilter(NodeFactory<E> aNode) {
		this.currentNode = aNode;
		nodesList = new LinkedList<NodeFactory<E>>();
		}
	
	public boolean hasNext() {
		while(!nodesList.isEmpty()) {
			currentNode = nodesList.peek();
			if((Double) currentNode.getData()  >= probationFilter) {
				return true;
			}
			else 
				currentNode = nodesList.pop();		
		}
		
		return false;
	}
	
	public E next () {
		if(hasNext()){
			NodeFactory<E> nextElement = nodesList.pop();
			return nextElement.getData();
		}
		else
			return null;
		
	}
	
	@Override
	public void remove() {
		// TODO Auto-generated method stub
		
	}

	
}
