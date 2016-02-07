package assignment1;

public class DoublyLinkedList {
	//Reference to first and last links of doubly linked list.
	Student firstLink;
	Student lastLink;

	public DoublyLinkedList() {
		firstLink = null;
		lastLink = null;
	}
	
	public void addStudentName(String studentName, double gpa, int redId) {
		
		Student newLink = new Student(studentName, gpa, redId);
		Student previousStudent = null;
		Student currentStudent = firstLink;
		if(isEmpty()) {
			lastLink = newLink;
		}
		//To maintain Student's name  in lexicographical order.
		while ((currentStudent != null) && (studentName.compareToIgnoreCase(currentStudent.studentName) > 0)) {
			previousStudent = currentStudent;
			currentStudent = currentStudent.next;
		}
		if (previousStudent == null) {
			firstLink = newLink;
		} else {
			previousStudent.next = newLink;
		}
		newLink.next = currentStudent;
	}
	public Student getKthNode(int k) {
		//For kth Value less than 1
		if (k <= 0) throw new IndexOutOfBoundsException("Index  "+k+ " is out of bound!");
		Student currentStudent = firstLink;
		for (int i = 1; i < k; i++) {
			//if Kth Value Exceeds Values of List then throws Exception.
			if (currentStudent.getNext() == null) throw new IndexOutOfBoundsException("Index  "+k+ " is out of bound!");
			currentStudent = currentStudent.getNext();
		}
		System.out.println("Student at " + k + "th position: " + currentStudent);
		return currentStudent;
	}
	
	public void display() {
		Student theLink = firstLink;
		System.out.println("Students Information : \n");
		while (theLink != null) {
			theLink.display();
			theLink = theLink.next;
		}
	}
	/*Method to print RedIds with GPA less than 2.85 */
	public void printRedIds() {
		Student theLink = firstLink;
		System.out.println("RedIds with GPA less than 2.85 are :");
		while (theLink != null) {
			if (theLink.gpa < 2.85) theLink.printRedIds();
			theLink = theLink.next;
		}

	}
	/* Method to print names of Students having GPA 4.0*/
	public void printNames() {
		Student theLink = firstLink;
		System.out.println("Students with GPA of 4.0 are :");
		while (theLink != null) {
			if (theLink.gpa == 4.0) theLink.printNames();
			theLink = theLink.next;
		}
	}
	public boolean isEmpty()  {
		return(firstLink == null);
	}
	public static void main(String a[]) {
		
		//Making a new list
		DoublyLinkedList linkedlist = new DoublyLinkedList();
		
		linkedlist.addStudentName("Sachin", 4.0, 818500963);
		linkedlist.addStudentName("David", 2.0, 818500964);
		linkedlist.addStudentName("John", 3.7, 818500961);
		linkedlist.addStudentName("Akshat", 4.0, 818500967);
		linkedlist.addStudentName("Karl", 2.3, 818500962);
		linkedlist.addStudentName("Bin", 1.0, 818500968);
		
		linkedlist.display();
		
		System.out.println("\n");
		linkedlist.printRedIds();
		
		System.out.println("\n");
		linkedlist.printNames();
		
		System.out.println("\n");
		linkedlist.getKthNode(10);
		

	}
}