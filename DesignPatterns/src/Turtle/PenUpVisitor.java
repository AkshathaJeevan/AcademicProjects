package assignment3;

public class PenUpVisitor implements Visitable {

	public void accept(TurtleVisitor visitor) {
		visitor.visit(this);

	}
}