package assignment2;
import java.lang.reflect.Array;
import java.util.*;

public  abstract class ListFactory<E> extends AbstractCollection<E> implements List<E>{

	 protected NodeFactory<E> node;
	 protected NodeFactory<E> head;
	 protected NodeFactory<E> tail;
	 E data;
	 
	 public ListFactory(E element,NodeFactory<E> head,E data) {
		this.data = element;
		this.data = data;
		this.head = head;
	}
	 
	 public ListFactory() {
		 
	 }
	public  abstract boolean add(E element) ;
	
	public Object[] toArray() {
		return toArray(node);
	}
	private Object[] toArray(NodeFactory<E> tail) {
		 Object[] array = new Object[size()];
		 NodeFactory<E> node = tail;
		 for (int i = 0; i < size(); i++) {
			  array[i] = node.data;
			  node = node.next;
		 }
		 return array;
		}
	 
		public <T> T[] toArray(T[] a) {
			if (a.length < size())
				a = (T[]) Array.newInstance(a.getClass().getComponentType(), size());
			else if (a.length > size()) 
				a[size()] = null;
				node = head;
				for (int i = 0; i < size(); i++)  {
				    a[i] = (T) node.data;
				    node = (Node<E>) node.next;
				}
				return a;
		}
	 private String toString(NodeFactory<E> node) {
		 NodeFactory<E> current = node;
			     String result = "";
			     while (current.isNull()) {
			         result = result + (current.getData()).toString() + "\n";
			         current = current.getNext();
			      }
			      return result;
		}	
	 public String toString() {
		 return toString(node);
	 }
	 
	 private int size(NodeFactory<E> aNode) {
		 int count = 0;
		 for (Iterator<E> i = iterator(); i.hasNext();) {
			 i.next();
			 count++;
		 }
		 return count;
		 }
	 public int size() {
		 return size(node);
		 }
	public Iterator<E> iterator() {
		return new ListIterator<E>(node);
	}
	
	public boolean isEmpty() {
	    return (size() == 0);
	}
	@Override
	public void add(int index, E element) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public boolean addAll(Collection<? extends E> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean addAll(int index, Collection<? extends E> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public void clear() {
		// TODO Auto-generated method stub
		
	}
	@Override
	public boolean contains(Object o) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean containsAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public E get(int index) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public int indexOf(Object o) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int lastIndexOf(Object o) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public java.util.ListIterator<E> listIterator(int index) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean remove(Object o) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public E remove(int index) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean removeAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean retainAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public E set(int index, E element) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<E> subList(int fromIndex, int toIndex) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public java.util.ListIterator<E> listIterator() {
		// TODO Auto-generated method stub
		return null;
	}
	 
	 
	
	
	



	


}