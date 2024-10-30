"use client";

import { User, Workout } from "@prisma/client";

export default function AdminPage({
  users,
  workoutsNo,
  workouts
}: {
  users: User[];
  workoutsNo: number;
  workouts: Workout[]
}) {
  return (
    <>
      <div className="md:w-[95%] h-full w-full absolute left-1/2 -translate-x-1/2 md:mt-2">
        <div className="md:rounded-lg sm:rounded-b-lg navbar bg-base-200">
          <div className="navbar-start"></div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl">Gym Website</a>
          </div>
          <div className="navbar-end">
            <a href="/api/logout" className="btn btn-error">
              Logout
            </a>
          </div>
        </div>

        <div className="h-3/4 w-full my-2 grid grid-cols-2 grid-rows-1 gap-4">
          <div className="bg-base-300 rounded-lg p-2">
            <div className="text-center">
              <h1 className="text-3xl">Workout</h1>
            </div>
            <div className="py-3">
              <label
                htmlFor="create-exercise"
                className="btn w-full btn-success"
              >
                Add workout
              </label>
            </div>

            <div className="overflow-x-hidden mt-4 h-[90%] overflow-y-scroll">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Sets</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <>
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold">{workout.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold">{workout.reps}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold">{workout.sets}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <label>
                              <input type="checkbox" className="checkbox" />
                            </label>
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-error btn-xs">
                            delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid h-full  grid-rows-2 grid-cols-2 gap-4">
            <div className="row-span-2 p-2 rounded-lg bg-base-300">
              <div className="text-center">
                <h1 className="text-3xl">Accounts</h1>
              </div>
              <label
                htmlFor="create-account"
                className="btn btn-success w-full my-3"
              >
                Create
              </label>

              <div className="overflow-x-hidden mt-4 h-[90%] overflow-y-scroll">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <>
                        <tr>
                          <td>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-bold">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <th>
                            <form
                              method="post"
                              action={`/api/account/delete?name=${user.name}`}
                            >
                              <input type="text" name="name" value="" hidden />

                              <input
                                type="submit"
                                className="btn btn-error"
                                value="delete"
                              />
                            </form>
                          </th>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-base-300 p-3 rounded-lg">
              <div className="stats w-full rounded-lg h-full shadow">
                <div className="stat">
                  <div className="stat-title">Total users</div>
                  <div className="stat-value">{users.length}</div>
                </div>
              </div>
            </div>
            <div className="bg-base-300 p-3 rounded-lg">
              <div className="stats w-full rounded-lg h-full shadow">
                <div className="stat">
                  <div className="stat-title">Total Workouts</div>
                  <div className="stat-value">{users.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="checkbox" id="create-exercise" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add exercise</h3>
          <form action="/api/workout/create" method="post" className="my-3">
            <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
            <input type="number" placeholder="Reps" name="reps" className="input input-bordered my-3" required />
            <input type="number" placeholder="Sets" name="sets" className="input input-bordered" required />
            <input type="submit" value="Add" className="btn ml-3 btn-success" />
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="create-exercise">
          Close
        </label>
      </div>
      <input type="checkbox" id="create-account" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create account</h3>
          <form action="/api/account/create" method="post" className="py-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-success ml-2"
            />
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="create-account">
          Close
        </label>
      </div>
    </>
  );
}
