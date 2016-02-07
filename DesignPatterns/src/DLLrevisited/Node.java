package assignment2;
	

public class Node<E> extends NodeFactory<E> {

	public Node() {
    	this.data = null;
    	this.next = new  NullNode<E>();
    	this.prev = new  NullNode<E>();
	}
	public Node(E element) {
    	this.data = element;
    	this.next = new NullNode<E>();
    	this.prev = new NullNode<E>();
	}
	
	@Override
	public boolean isNull() {
		return false;
	}
}

