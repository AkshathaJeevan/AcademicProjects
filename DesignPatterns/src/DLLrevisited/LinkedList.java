package assignment2;

import java.util.Iterator;

public class LinkedList<E> {

	private ListStrategy<E> _aListStrategy;
	protected LinkedList<E> head;
	protected LinkedList<E> tail;
	protected E data;
	
	public LinkedList() {
		this._aListStrategy = new AbstractListStrategy<E>();
	}
	public LinkedList(ListStrategy<E> aListStrategy) {
		this._aListStrategy = aListStrategy;
		}
	public LinkedList(E data) {
		this.data =data;
		
	}
	public Iterator<E> iterator() {
		return (_aListStrategy.iterator());
		}
	public LinkedList(E element, LinkedList<E> first) {
		this.data = element;
		this.head = first;
		
	}
	public boolean add(E anObject) {
		return _aListStrategy.add(anObject);
		}
	public void add(String string, double d, int i) {
		
	}	
		
		
}
