package assignment2;

import java.util.Iterator;

public abstract class ListDecorator<E>  implements ListStrategy<E> {
	
	protected final ListFactory<E> aListFactory;
	
	public ListDecorator(ListFactory<E> aListFactory) {
	
	this.aListFactory = aListFactory;
	}
	
	public boolean add(E anObject) {
	return aListFactory.add(anObject);
	}
	
	public abstract Iterator<E> iterator();
	public abstract String toString();
	public abstract Object[] toArray();
	public int size() {
	return aListFactory.size();
	}
	}

