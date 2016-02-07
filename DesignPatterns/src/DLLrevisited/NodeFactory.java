package assignment2;	


public abstract  class NodeFactory<E> {
	
	protected E data ;
	protected Node<E> next;
	protected Node<E> prev;
	
	public E getData() {
		return data;
	}
	public void setData(E data) {
		this.data = data;
	}
	public Node<E> getNext() {
		return next;
	}
	public Node<E> getPrev() {
		return prev;
	}
	public abstract boolean isNull();
	 
}
