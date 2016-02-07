package assignment3;

public class PenDownVisitor implements Visitable {

	public void accept(TurtleVisitor visitor) {
		visitor.visit(this);

	}
}