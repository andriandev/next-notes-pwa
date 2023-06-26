import MetaHead from '@/components/shared/meta-head';

function Offline() {
  return (
    <>
      <MetaHead title="Notes App Offline" index="noindex" />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div className="text-center">
          <h1 className="display-1 fw-bold">Offline</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> No Internet.
          </p>
          <p className="lead">No internet detected on your device.</p>
        </div>
      </div>
    </>
  );
}

export default Offline;
