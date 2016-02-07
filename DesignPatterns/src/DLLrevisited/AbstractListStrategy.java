package DLLrevisited;

import java.util.Comparator;

public class AbstractListStrategy<E> extends ListFactory<E> implements ListStrategy<E>{

	
	LinkedList<E> head;
	LinkedList<E> tail;
	Comparator<E> comparer;
	E data;
	
	public AbstractListStrategy() {
		node= new NullNode<E>();
	}
	public boolean add(E element) {
		return add(element, comparer);
	}
	public boolean add(E element,Comparator<E> comparer) {
		if (comparer(element, data) == -1) {
		return prepend(element);
		}
		return add(element,comparer);
		}
	
	private int comparer(E element, E data) {
		if(data.toString().compareTo(element.toString()) < 0)
			return -1;
		else if(data.toString().compareTo(element.toString()) > 0) {
			return 1;
		}
		return 0;
	}
	private boolean prepend(E element) {
		if(isEmpty()) {
			head = tail = new LinkedList<E>(data);
			tail.next = null;
			return true;
		}
		else
			head = new LinkedList<E>(data,head);
		return false;
	}
	
	

}
