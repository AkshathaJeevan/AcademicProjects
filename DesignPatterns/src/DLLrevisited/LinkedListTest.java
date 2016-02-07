package assignment2;

import static org.junit.Assert.*;

import java.util.Iterator;

import assignment2.LinkedList;

import org.junit.Test;
public class LinkedListTest<E> {

	@Test
	public void testLinkedList() {
		LinkedList<E> list = new LinkedList<E>();
		list.add("Sachin", 4.0, 818500963);
		list.add("David", 2.0, 818500964);
		list.add("John", 3.7, 818500961);
		list.add("Akshat", 4.0, 818500967);
		list.add("Karl", 2.3, 818500962);
		list.add("Bin", 1.0, 818500968);
		assertEquals( "Akshat 4.0 818500967"
					+ "Bin 1.0 818500968 "
					+ "David 2.0 818500964 "
					+ "John 3.7 818500961"
					+ " Karl 2.3 818500962 "
					+ "Sachin 4.0 818500963" , list.toString());
	}
	@Test
	public void fwdStrategyPatternTest()  {
		LinkedList<String> list = new LinkedList<String>(new AbstractListStrategy<String>());
		list.add("Sachin");
		list.add("David");
		list.add("John");
		list.add("Akshat");
		list.add("Bin");
		assertEquals("Akshat"
				+"Bin"
				+"David"
				+"John"
				+"Sachin", list.toString());
	}
	public void revStrategyPatternTest()  {
		LinkedList<String> list = new LinkedList<String>(new AbstractListStrategy<String>());
		list.add("Sachin");
		list.add("David");
		list.add("John");
		list.add("Akshat");
		list.add("Bin");
		assertEquals("Sachin"
				+"John"
				+"David"
				+"Bin"
				+"Akshat", list.toString());
	}
	@Test
	 public void testListIterator() {
		LinkedList<String> list = new LinkedList<String>();
		list.add("Sachin");
		list.add("David");
		list.add("John");
		list.add("Akshat");
		list.add("Bin");
		Iterator<String> i = list.iterator();
		String Students = "";
		while (i.hasNext()) {
			Students = Students + i.next() + " ";
		}
		 assertEquals("List Iterator", "Bin Akshat John David Sachin", Students);
	}
	
	@Test
	 public void testDecoratorPattern() {
		OnProbationDecorator<String> listFactory = new AbstractListStrategy<String>();
		listFactory = new OnProbationDecorator<String>(listFactory);
		listFactory.add("Sachin", 4.0, 818500963);
		listFactory.add("David", 2.0, 818500964);
		listFactory.add("John", 3.7, 818500961);
		listFactory.add("Akshat", 4.0, 818500967);
		listFactory.add("Karl", 2.3, 818500962);
		listFactory.add("Bin", 1.0, 818500968);
		Iterator<int> i = listFactory.iterator();
		assertEquals("Decorator Iterator Filter Test", "2.85", i.next());
		
	}
	
}
