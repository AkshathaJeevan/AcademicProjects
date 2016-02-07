package assignment3;

public class MoveVisitor implements Visitable	{

private int distance;
public MoveVisitor(int distance) {
		super();
		this.distance = distance;
	}
@Override
public void accept(TurtleVisitor visitor) {
	visitor.visit(this);
	
}
public int getDistance() {
	return distance;
}
}



