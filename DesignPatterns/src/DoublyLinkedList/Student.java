package assignment1;

import java.util.Iterator;

import assignment2.NodeFactory;

public class Student {
		
		//data Items to be inserted.
		public String studentName;
		public double gpa;
		public int redId;
		//respective links of list.
		public Student  next;
		public Student  previous;
		
		public Student(String name, double gpa, int redId) {
			this.studentName = name;
			this.gpa = gpa;
			this.redId = redId;
		}
		//To display the list.
		public void display() {
			System.out.println(studentName + "\t " + gpa + "\t" + redId);
		}
		//To Print Student Names.
		public void printNames() {
			System.out.println(studentName);
		}
		//To Print student RedIds.
		public void printRedIds() {
			System.out.println(+redId);
		}
		
		public String toString() {
			return studentName;
		}
		//Access to fields.
		public Student getNext() {
			return next;
		}
		public Student getPrevious() {
			return previous;
		}
		//to modify fields.
		public void setNext(Student next) {
			this.next = next;
		}
		public void setPrevious(Student previous) {
			this.previous = previous;
		}

		
}


