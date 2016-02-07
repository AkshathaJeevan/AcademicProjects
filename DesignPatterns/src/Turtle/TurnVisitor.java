package assignment3;

public class TurnVisitor implements Visitable {
private double angle;

public TurnVisitor(double angle) {
this.angle =  angle;
}
public void accept(TurtleVisitor visitor) {
visitor.visit(this);
}
public double getAngle() {
		return angle;
	}
}