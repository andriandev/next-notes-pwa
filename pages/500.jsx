import Link from 'next/link';
import MetaHead from '@/components/shared/meta-head';

function NotFound() {
  return (
    <>
      <MetaHead
        title="500 Internal Server Error"
        description="500 Internal Server Error"
        index="noindex"
      />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div className="text-center">
          <h1 className="display-1 fw-bold">500</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Internal Server Error.
          </p>
          <p className="lead">The page you visited is error.</p>
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
