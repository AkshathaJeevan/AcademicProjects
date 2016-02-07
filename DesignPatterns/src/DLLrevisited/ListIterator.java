package assignment2;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class ListIterator<E> implements Iterator<E>{

	private NodeFactory<E> currentNode;
	public ListIterator(NodeFactory<E> head) {
		currentNode = head;
	}
	public boolean hasNext() {
		      return (!currentNode.isNull());
	}
	
	public E next() {
		if(!hasNext()) 
			throw new NoSuchElementException();
		E nextNode = currentNode.getData();
		currentNode = currentNode.getNext();
	    return nextNode;
	}

	public void remove() throws UnsupportedOperationException
	   {
	      throw new UnsupportedOperationException();
	   }

}
