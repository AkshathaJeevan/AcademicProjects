package assignment2;

import java.util.Iterator;

public class OnProbationDecorator<E> extends ListDecorator<E>{

	public OnProbationDecorator(ListFactory<E> aListFactory) {
		super(aListFactory);
		
	}

	public Iterator<E> iterator() {
		return (new OnProbationFilter<E>(aListFactory.node));
		
	}
	public String toString() {
		String nodeString = "";
		for (Iterator<E> i = iterator(); i.hasNext();) {
			nodeString = nodeString + " " + i.next();
		}
		return nodeString;
	}
	
	public Object[] toArray() {
		int index = 0;
		for (Iterator<E> i = iterator(); i.hasNext();) {
		i.next();
		index++;
		}
		Object[] nodeArray = new Object[index];
		index = 0;
		for (Iterator<E> i = iterator(); i.hasNext();) {
			nodeArray[index] = i.next();
		index++;
		}
		return nodeArray;
		}
	

	

}
