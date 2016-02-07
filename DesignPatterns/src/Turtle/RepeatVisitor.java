package assignment3;

public class RepeatVisitor implements Visitable{
	public void accept(TurtleVisitor visitor) {
		visitor.visit(this);
	}

}
