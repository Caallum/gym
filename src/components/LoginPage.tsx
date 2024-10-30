'use client';

import { User } from "@prisma/client";

type pageParans = {
  accounts: User[]
}

export default function Home(params: pageParans) {

    return (
      <>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Select user</h1>
            </div>
            <div className="card bg-base-100 w-full p-2 max-w-sm shrink-0 shadow-2xl">
              {params.accounts.map((account: User) => (
                <>
                  <div className="collapse bg-base-200 my-2">
                    <input type="radio" name="accordiation" />
                    <div className="collapse-title text-xl text-center font-medium">
                      {account.name}
                    </div>
                    <div className="collapse-content">
                      <form action={"/api/login"} method="post">
                        <div>
                          <input type="text" value={account.name} name="name" id="name" className="invisible" />
                        </div>
                        <div className="form-control">
                          <input type="submit" value="Continue" className="btn btn-success" />
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  