package assignment2;

public class NullNode<E> extends NodeFactory<E> {

	public NullNode() {
    	this.data = null;
    	this.next = null;
    	this.prev = null;
	}
	@Override
	public boolean isNull() {
		return true;
	}

}

