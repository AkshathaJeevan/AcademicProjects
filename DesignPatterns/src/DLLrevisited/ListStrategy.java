package assignment2;

import java.util.Iterator;


public interface ListStrategy<E> {
	
	public boolean add(E element) ;

	public Iterator<E> iterator();
	public String toString();
	public Object[] toArray();
	public int size();

}
